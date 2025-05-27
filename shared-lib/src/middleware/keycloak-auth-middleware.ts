/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";

import { getKeycloakIdpUrl, getTenantIdFromURL, isInSameOrigin } from "../util/url-handler";

import { invokeKeyclockAuthorizationEndpoint } from "../service/rest_api/keycloak-rest-service";
import { KeycloakAuthrorizationResponse } from "../proxy/request_formats/response-format";

import { InvalidURLException } from "../errors/custom_exceptions/invalid-url-exception";
import { UnauthorizeAccessException } from "../errors/custom_exceptions/unauthorize-access-exception";
import { RequestOriginNotFoundException } from "../errors/custom_exceptions/request-origin-not-found-exception";

/**
 * this is for add the currentUser property to the request object
 */
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            currentUser?: KeycloakAuthrorizationResponse;
            keycloakTenant?: string;
            keycloakIdpServerUrl?: string;
        }
    }
}

/**
 * this is middleware for keycloak authorization
 * it will invoke the keycloak authorization endpoint to validate the authorization header
 * and add the currentUser property to the request object
 * the currentUser property is the response body of the keycloak authorization endpoint
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns the next function if the request is authorized
 * @throws InvalidURLException if the tenant secret is not defined
 * @throws UnauthorizeAccessException if the authorization header is not defined
 * @throws AxiosException if the keyclock authorization endpoint returns an error
 * @throws Error if the keyclock authorization endpoint returns an error if the error is not an AxiosError
 */
const keycloakAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let keyTenant;
    let keyclockIdpServerUrl;

    const origin = req.headers.origin as string;
    const referUrl = req.headers.referer as string;
    const secFetchSite = req.headers["sec-fetch-site"] as string;

    console.log(`origin: ${origin}, referUrl: ${referUrl}, secFetchSite: ${secFetchSite}`);

    try {

        let url = origin;

        if ((origin && origin.includes("pro-mentor.live")) || (referUrl && referUrl.includes("pro-mentor.live") )
            || (origin && origin.includes("nsbm-promentor")) || (referUrl && referUrl.includes("nsbm-promentor"))) {
            keyTenant = "nsbm";
            keyclockIdpServerUrl = "http://keycloak-service:443"
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!origin) {
                url = referUrl;
    
                if (!isInSameOrigin(url, secFetchSite, `${process.env.HOST as string}:${process.env.PORT as string}`)) {
                    return next(new UnauthorizeAccessException());
                }
    
                keyTenant = "nsbm";
                keyclockIdpServerUrl = "http://keycloak-service:443";
            } else {
                keyTenant = getTenantIdFromURL(url as string);
                keyclockIdpServerUrl = getKeycloakIdpUrl(url as string);
            }
        }
    } catch (error) {
        return next(error);
    }

    console.log(`reserved request to tenant: ${keyTenant}, redirecting to idpServer: ${keyclockIdpServerUrl}`);

    // get the tenant secret from the environment variable
    const tenatSecret = process.env[`${keyTenant.toUpperCase()}_CLIENT_SECRET`] as string;

    // if the tenant secret is not defined, throw an error
    if (!tenatSecret) {
        console.error(`The tenant secret must be defined for the tenant ${keyTenant}`);
        return next(new InvalidURLException());
    }

    // get the authorization header from the request
    const authorization = req.headers.authorization as string;

    // if the authorization header is not defined, throw an error
    if (!authorization) {
        console.error("The authorization header must be defined in the request");
        return next(new RequestOriginNotFoundException());
    }

    // invoke the keycloak authorization endpoint 
    let authResponse;

    try {
        authResponse = await invokeKeyclockAuthorizationEndpoint(
            keyclockIdpServerUrl,
            keyTenant,
            tenatSecret,
            authorization,
            process.env.KEYCLOAK_CLIENT_ID as string
        );
    } catch (error) {
        console.error(`Error while invoking the keycloak authorization endpoint`);
        return next(error);
    }

    // add the currentUser property to the request object
    req.currentUser = authResponse;
    req.keycloakTenant = keyTenant;
    req.keycloakIdpServerUrl = keyclockIdpServerUrl;

    next();
};

export {
    keycloakAuthMiddleware
};
