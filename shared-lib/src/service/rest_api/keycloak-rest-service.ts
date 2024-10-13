import {invokeRestEndpoint} from "../../proxy/invoke-rest-endpoint";
import { KeycloakAuthrorizationResponse } from "../../proxy/request_formats/response-format";

/**
 * this function is used to invoke keyclock authorization endpoint
 * @param keyclockIdpServerUrl the url of the keyclock idp server
 * @param keyTenant the tenant of the keyclock idp server
 * @param tenatSecret the secret of the tenant
 * @param authorizationToken the authorization token
 * @param client_id the client id of the tenant
 * @returns the response body of the keyclock authorization endpoint which is a KeycloakAuthrorizationResponse
 * @throws AxiosException if the keyclock authorization endpoint returns an error if the error is an AxiosError
 * @throws Error if the keyclock authorization endpoint returns an error if the error is not an AxiosError
 */
const invokeKeyclockAuthorizationEndpoint = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    tenatSecret: string,
    authorizationToken: string,
    client_id: string,
): Promise<KeycloakAuthrorizationResponse | undefined> => {
    const authResponse = await invokeRestEndpoint<KeycloakAuthrorizationResponse>(
        `${keyclockIdpServerUrl}/realms/${keyTenant}/protocol/openid-connect/token/introspect`,
        "POST",
        {
            token: authorizationToken.split(" ")[1],
            client_id,
            client_secret: tenatSecret,
        },
        {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    );

    return authResponse;
};

export {
    invokeKeyclockAuthorizationEndpoint
};
