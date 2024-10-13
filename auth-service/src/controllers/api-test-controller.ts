import {
    AxiosException,
    ErrorCode,
    getKeycloakIdpUrl,
    getTenantIdFromURL,
    invokeKeyclockAuthorizationEndpoint,
} from "@promentor-app/shared-lib";
import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "axios";
import { getUserTokenInGivenKeyCloakTenant } from "../service/rest_api/keycloak-rest-service";

const getAccessTokenForTheUser = async (req: Request, res: Response, next: NextFunction) => {
    let keyTenant;
    let keyclockIdpServerUrl;

    try {
        keyTenant = getTenantIdFromURL(req.headers.origin as string);
        keyclockIdpServerUrl = getKeycloakIdpUrl(req.headers.origin as string);

        const response = await getUserTokenInGivenKeyCloakTenant(keyclockIdpServerUrl, keyTenant, {
            username: req.body.username,
            password: req.body.password,
            grant_type: "password",
            client_id: process.env.KEYCLOAK_CLIENT_ID as string,
            client_secret: process.env[`${keyTenant.toUpperCase()}_CLIENT_SECRET`] as string,
        });

        const clientDetails = await invokeKeyclockAuthorizationEndpoint(
            keyclockIdpServerUrl,
            keyTenant,
            process.env[`${keyTenant.toUpperCase()}_CLIENT_SECRET`] as string,
            `Bearer ${response?.access_token}`,
            process.env.KEYCLOAK_CLIENT_ID as string
        );

        return res.status(HttpStatusCode.Ok).json({
            data: {
                access_token: response?.access_token,
                clientData: clientDetails,
            },
        });
    } catch (error) {
        if (error instanceof AxiosException) {
            if (error.statusCode === HttpStatusCode.Unauthorized) {
                error.errorCode = ErrorCode.UNAUTHORIZED_ACCESS;
            }
        }
        return next(error);
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    getAccessTokenForTheUser,
};
