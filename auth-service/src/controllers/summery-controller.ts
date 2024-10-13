import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { InvalidArrayException, UserGroups } from "@promentor-app/shared-lib";

import { getGroupInGivenKeyCloakTenant } from "../service/rest_api/keycloak-rest-service";
import { getTenantId, queryUsersCountWithoutState } from "../service/sql/keyclok-db-service";
import { KeycloakFilterUsersCountResponse } from "../models/response/keycloak-db-response-modal";

const getUserCounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const tenantId = await getTenantId(keyTenant);

        const studentGroupList = await getGroupInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            UserGroups.STUDENT
        );

        const lectureGroupList = await getGroupInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            UserGroups.LECTURER
        );

        const adminGroupList = await getGroupInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            UserGroups.ADMIN
        );

        const staffGroupList = await getGroupInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            UserGroups.IT_DEPARTMENT
        );

        if (
            !studentGroupList ||
            studentGroupList.length < 1 ||
            !lectureGroupList ||
            lectureGroupList.length < 1 ||
            !adminGroupList ||
            adminGroupList.length < 1 ||
            !staffGroupList ||
            staffGroupList.length < 1
        ) {
            throw new InvalidArrayException();
        }

        const finalStudentGroups = [studentGroupList[0].id];
        const finalLectureGroups = [lectureGroupList[0].id];
        const finalAdminGroups = [adminGroupList[0].id];
        const finalStaffGroups = [staffGroupList[0].id];

        const studentCount = await queryUsersCountWithoutSearch(tenantId, finalStudentGroups as string[]);
        const lectureCount = await queryUsersCountWithoutSearch(tenantId, finalLectureGroups as string[]);
        const adminCount = await queryUsersCountWithoutSearch(tenantId, finalAdminGroups as string[]);
        const staffCount = await queryUsersCountWithoutSearch(tenantId, finalStaffGroups as string[]);

        return res.status(HttpStatusCode.Ok).json({
            data: {
                student: studentCount.count,
                lecture: lectureCount.count,
                admin: adminCount.count,
                staff: staffCount.count,
            },
        });
    } catch (error) {
        return next(error);
    }
};
const queryUsersCountWithoutSearch = async (
    tenantId: string,
    groups: string[]
): Promise<KeycloakFilterUsersCountResponse> => {
    return queryUsersCountWithoutState(tenantId, groups);
};

export { getUserCounts };
