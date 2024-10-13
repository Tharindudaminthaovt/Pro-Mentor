import { GroupNotFoundException } from "@promentor-app/shared-lib";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";

import {
    getGroupByIdInGivenKeyCloakTenant,
    getGroupInGivenKeyCloakTenant,
} from "../service/rest_api/keycloak-rest-service";

const getSubGroupsInGivenTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const { groupName } = req.params;

        const groupList = await getGroupInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            groupName
        );

        if (!groupList || groupList.length === 0) {
            console.error("Group not found");
            throw new GroupNotFoundException();
        }

        const group = await getGroupByIdInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            req.headers.authorization as string,
            groupList[0].id
        );

        const subGroups = group?.subGroups?.map((subGroup: { id: string; name: string; path: string }) => {
            return {
                id: subGroup.id,
                name: subGroup.name,
                path: subGroup.path,
            };
        });

        const response = {
            id: group?.id,
            name: group?.name,
            path: group?.path,
            subGroups,
        };

        return res.status(HttpStatusCode.Ok).json(response);
    } catch (error) {
        return next(error);
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    getSubGroupsInGivenTenant,
};
