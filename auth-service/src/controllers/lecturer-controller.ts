import { NextFunction, Request, Response } from "express";
import {
    CustomException,
    ErrorCode,
    InvalidArrayException,
    UserGroups,
    rabbitMQPublihserChannelWrapper,
} from "@promentor-app/shared-lib";
import { HttpStatusCode } from "axios";

import { KeycloakCreateUserRequest, KeycloakUpdateUserByIdRequest } from "../models/request/keycloak-requrest-model";
import {
    assignGroupToUserInGivenKeyCloakTenant,
    createUserInGivenKeyCloakTenant,
    getGroupInGivenKeyCloakTenant,
    getUserByIdInGivenKeyCloakTenant,
    getUserGroupsByUserIdInGivenKeyCloakTenant,
    removeGroupFromUserInGivenKeyCloakTenant,
    updateUserInGivenKeyCloakTenant,
} from "../service/rest_api/keycloak-rest-service";
import { generateTempPassword } from "../utils/password-handler";
import { getUserGropsWithFullPath } from "../utils/usergroup-handler";
import { User } from "../models/domain/User";
import UserTemparyPasswordCreatedPublisher from "../events/publishers/user-tempary-password-created-publisher";
import {
    getTenantId,
    queryAndSearchUsersCountWithStatus,
    queryAndSearchUsersCountWithoutState,
    queryAndSearchUsersWithStatus,
    queryAndSearchUsersWithoutState,
    queryUsersCountWithStatus,
    queryUsersCountWithoutState,
    queryUsersWithStatus,
    queryUsersWithoutState,
} from "../service/sql/keyclok-db-service";
import {
    KeycloakFilterUsersCountResponse,
    KeycloakFilterUsersResponse,
} from "../models/response/keycloak-db-response-modal";

const getLectureById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;
        const { id } = req.params;

        const result = await getUserByIdInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            id
        );

        if (!result) {
            console.error("User not found in IDP server");
            // need to change

            throw new CustomException(
                "User not found in IDP server",
                ErrorCode.USER_NOT_FOUND_IN_KEYCLOAK,
                HttpStatusCode.NotFound
            );
        }

        // get the groups assign to the user
        const userGroups = await getUserGroupsByUserIdInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            id
        );

        // get the user from database
        const existingUser = await User.findOne({ email: result?.email }).exec();

        const data = {
            id: result.id,
            createdTimestamp: result.createdTimestamp,
            username: result.username,
            enabled: result.enabled,
            emailVerified: result.emailVerified,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            contactNumber: existingUser?.contactNumber,
            profileUrl: existingUser?.profileUrl,
            groups: userGroups,
        };

        return res.status(HttpStatusCode.Ok).json({
            data,
        });
    } catch (error) {
        return next(error);
    }
};

const createLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const { username, email, firstName, lastName, contactNumber, studentClass, degreeProgram, school } = req.body;

        const tempPassword = generateTempPassword();

        // create group list
        const groupList = [UserGroups.LECTURER as string];

        // update group path and add to group list
        if (studentClass) {
            groupList.push(...getUserGropsWithFullPath(studentClass, UserGroups.CLASS));
        }
        if (degreeProgram) {
            groupList.push(...getUserGropsWithFullPath(degreeProgram, UserGroups.DEGREE_PROGRAM));
        }
        if (school) {
            groupList.push(...getUserGropsWithFullPath(school, UserGroups.SCHOOL));
        }

        const user: KeycloakCreateUserRequest = {
            username,
            email,
            firstName,
            lastName,
            enabled: true,
            groups: groupList,
            credentials: [
                {
                    type: "password",
                    temporary: true,
                    value: tempPassword,
                },
            ],
            access: {
                manageGroupMembership: true,
                view: true,
                mapRoles: true,
                impersonate: true,
                manage: true,
            },
        };

        await createUserInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            user,
            req.headers.authorization as string
        );

        // find exsiting user
        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            console.error("User already exists");
            throw new CustomException(
                "User Created in IDP server. But User already exists in DB",
                ErrorCode.USER_ALREADY_EXISTS_IN_DB,
                HttpStatusCode.Conflict
            );
        }

        // create user in db
        const dbUser = User.build({
            username,
            email,
            firstName,
            lastName,
            contactNumber,
            profileUrl: "",
        });

        await dbUser.save();

        // publish the event for notify the new user with tempary password
        await new UserTemparyPasswordCreatedPublisher(rabbitMQPublihserChannelWrapper.publisherChannel).publish({
            username,
            email,
            temparyPassword: tempPassword,
            firstName,
            lastName,
            tenantId: keyTenant,
        });

        return res.status(HttpStatusCode.Created).json({
            data: {
                message: "Lecturer created successfully",
            },
        });
    } catch (error) {
        return next(error);
    }
};

const updateLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const { id } = req.params;

        const { email, enabled, firstName, lastName, contactNumber } = req.body;

        const keycloakUser = await getUserByIdInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            id
        );

        if (!keycloakUser) {
            console.error("User not found in IDP server");
            throw new CustomException(
                "User not found in IDP server",
                ErrorCode.USER_NOT_FOUND_IN_KEYCLOAK,
                HttpStatusCode.NotFound
            );
        }

        const emailVerifiedStatus = keycloakUser.email === email || !email ? keycloakUser.emailVerified : false;
        const enableStates: boolean = enabled === null || enabled === undefined ? keycloakUser.enabled : enabled;

        const updateUser: KeycloakUpdateUserByIdRequest = {
            email: email as string,
            firstName: firstName as string,
            lastName: lastName as string,
            access: keycloakUser.access,
            emailVerified: emailVerifiedStatus,
            enabled: enableStates,
        };

        await updateUserInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            updateUser,
            req.headers.authorization as string,
            id
        );

        const existingUser = await User.findOne({ username: keycloakUser.username }).exec();

        if (existingUser) {
            existingUser.username = keycloakUser.username;
            existingUser.email = email;
            existingUser.firstName = firstName;
            existingUser.lastName = lastName;
            existingUser.contactNumber = contactNumber;
            existingUser.profileUrl = "";

            await existingUser.save();

            return res.status(HttpStatusCode.Ok).json({
                data: {
                    message: "Lecture updated successfully",
                },
            });
        }

        const dbUser = User.build({
            username: keycloakUser.username,
            email,
            firstName,
            lastName,
            contactNumber,
            profileUrl: "",
        });

        await dbUser.save();

        return res.status(HttpStatusCode.Created).json({
            data: {
                message: "Lecture not available in database for update. Created new lecture in db",
            },
        });
    } catch (error) {
        console.error((error as Error).message);
        return next(error);
    }
};

const getLecturers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const tenantId = await getTenantId(keyTenant);

        const { groups, limit, offset, active, search } = req.query;

        if (!(!groups || Array.isArray(groups))) {
            console.error("groups should be valid array or null");
            throw new InvalidArrayException();
        }

        let finalGroups = groups;

        if (!groups || groups.length < 1) {
            const groupList = await getGroupInGivenKeyCloakTenant(
                keyclockIdpServerUrl,
                keyTenant,
                req.headers.authorization as string,
                UserGroups.LECTURER
            );

            if (!groupList || groupList.length < 1) {
                throw new InvalidArrayException();
            }

            finalGroups = [groupList[0].id];
        }

        let result: KeycloakFilterUsersResponse[];

        if (!search) {
            result = await queryUsersWithoutSearch(
                tenantId,
                finalGroups as string[],
                active as unknown as boolean,
                limit as unknown as number,
                offset as unknown as number
            );
        } else {
            result = await queryUsersWithSearch(
                tenantId,
                finalGroups as string[],
                search as string,
                active as unknown as boolean,
                limit as unknown as number,
                offset as unknown as number
            );
        }

        const finalResult = result.map((lecture) => ({
            id: lecture.id,
            email: lecture.email,
            emailVerified: lecture.email_verified,
            enabled: lecture.enabled,
            firstName: lecture.first_name,
            lastName: lecture.last_name,
            username: lecture.username,
        }));

        return res.status(HttpStatusCode.Ok).json({ data: finalResult });
    } catch (error) {
        return next(error);
    }
};

const getLecturersCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const tenantId = await getTenantId(keyTenant);

        const { groups, active, search } = req.query;

        if (!(!groups || Array.isArray(groups))) {
            console.error("groups should be valid array or null");
            throw new InvalidArrayException();
        }

        let finalGroups = groups;

        if (!groups || groups.length < 1) {
            const groupList = await getGroupInGivenKeyCloakTenant(
                keyclockIdpServerUrl,
                keyTenant,
                req.headers.authorization as string,
                UserGroups.LECTURER
            );

            if (!groupList || groupList.length < 1) {
                throw new InvalidArrayException();
            }

            finalGroups = [groupList[0].id];
        }

        let result: KeycloakFilterUsersCountResponse;

        if (!search) {
            result = await queryUsersCountWithoutSearch(
                tenantId,
                finalGroups as string[],
                active as unknown as boolean
            );
        } else {
            result = await queryUsersCountWithSearch(
                tenantId,
                finalGroups as string[],
                search as string,
                active as unknown as boolean
            );
        }

        return res.status(HttpStatusCode.Ok).json({ data: result });
    } catch (error) {
        return next(error);
    }
};

const queryUsersWithoutSearch = async (
    tenantId: string,
    groups: string[],
    active?: boolean,
    limit?: number,
    offset?: number
): Promise<KeycloakFilterUsersResponse[]> => {
    let result: KeycloakFilterUsersResponse[];

    if (active == null || active === undefined) {
        if (limit && limit > 0) {
            result = await queryUsersWithoutState(tenantId, groups, limit, offset);
        } else {
            result = await queryUsersWithoutState(tenantId, groups);
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (limit && limit > 0) {
            result = await queryUsersWithStatus(tenantId, groups, active, limit, offset);
        } else {
            result = await queryUsersWithStatus(tenantId, groups, active);
        }
    }

    return result;
};

const queryUsersWithSearch = async (
    tenantId: string,
    groups: string[],
    search: string,
    active?: boolean,
    limit?: number,
    offset?: number
): Promise<KeycloakFilterUsersResponse[]> => {
    let result: KeycloakFilterUsersResponse[];

    if (active == null || active === undefined) {
        if (limit && limit > 0) {
            result = await queryAndSearchUsersWithoutState(tenantId, groups, search, limit, offset);
        } else {
            result = await queryAndSearchUsersWithoutState(tenantId, groups, search);
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (limit && limit > 0) {
            result = await queryAndSearchUsersWithStatus(tenantId, groups, search, active, limit, offset);
        } else {
            result = await queryAndSearchUsersWithStatus(tenantId, groups, search, active);
        }
    }

    return result;
};

const queryUsersCountWithoutSearch = async (
    tenantId: string,
    groups: string[],
    active?: boolean
): Promise<KeycloakFilterUsersCountResponse> => {
    let result: KeycloakFilterUsersCountResponse;

    if (active == null || active === undefined) {
        result = await queryUsersCountWithoutState(tenantId, groups);
    } else {
        result = await queryUsersCountWithStatus(tenantId, groups, active);
    }

    return result;
};

const queryUsersCountWithSearch = async (
    tenantId: string,
    groups: string[],
    search: string,
    active?: boolean
): Promise<KeycloakFilterUsersCountResponse> => {
    let result: KeycloakFilterUsersCountResponse;

    if (active == null || active === undefined) {
        result = await queryAndSearchUsersCountWithoutState(tenantId, groups, search);
    } else {
        result = await queryAndSearchUsersCountWithStatus(tenantId, groups, search, active);
    }

    return result;
};

const addGroupsToLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const { id } = req.params;
        const { groups }: { groups: string[] } = req.body;

        await Promise.all(
            groups.map(async (group) => {
                await assignGroupToUserInGivenKeyCloakTenant(
                    keyclockIdpServerUrl,
                    keyTenant,
                    req.headers.authorization as string,
                    id,
                    group
                );
                console.info(`Group ${group} added to lecturer ${id}`);
            })
        );

        return res.status(HttpStatusCode.Ok).json({ message: "Groups added to lecturer successfully" });
    } catch (error) {
        return next(error);
    }
};

const removeGroupFromLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const { id } = req.params;
        const { groups }: { groups: string[] } = req.body;

        await Promise.all(
            groups.map(async (group) => {
                await removeGroupFromUserInGivenKeyCloakTenant(
                    keyclockIdpServerUrl,
                    keyTenant,
                    req.headers.authorization as string,
                    id,
                    group
                );
                console.info(`Group ${group} added to lecturer ${id}`);
            })
        );

        return res.status(HttpStatusCode.Ok).json({ message: "Groups removed from lecturer successfully" });
    } catch (error) {
        return next(error);
    }
};

export {
    getLectureById,
    createLecturer,
    updateLecturer,
    getLecturers,
    getLecturersCount,
    addGroupsToLecturer,
    removeGroupFromLecturer,
};
