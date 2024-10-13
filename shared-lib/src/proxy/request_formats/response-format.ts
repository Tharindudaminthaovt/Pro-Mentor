/**
 * ResponseBodyFormats for this application.
 * all the response bodys should implement this interface
 * @interface ResponseBodyFormat is an interface that represents the possible values for the body in a HTTP response.
 * @description ResponseBodyFormat is a type that represents the possible values for the body in a HTTP response.
 * 
 */
interface ResponseBodyFormat {}

/**
 * KeycloakAuthrorizationResponse is an interface that represents the possible values for the body in a HTTP response.
 * that is returned from the keycloak authorization endpoint.
 * @see https://www.keycloak.org/docs/latest/authorization_services/#_service_protection_api
 */
interface KeycloakAuthrorizationResponse extends ResponseBodyFormat {
    active: boolean;
    exp?: number;
    iat?: number;
    auth_time?: number;
    iss?: string;
    aud?: string[];
    jti?: string;
    nbf?: number;
    sub?: string;
    typ?: string;
    azp?: string;
    nonce?: string;
    session_state?: string;
    client_id?: string;
    username?: string;
    scope?: string;
    email_verified?: boolean;
    arc?: string;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    tenant?: string;
    groups?: string[];
    realm_access?: {
        roles?: string[];
    };
    resource_access?: {
        account?: {
            roles?: string[];
        };
    };
    "allowed-origins"?: string[];
    resource_access_token?: string;
    token_type?: string;
    refresh_token?: string;
    "not-before-policy"?: number;
    sid?: string;
}

export { ResponseBodyFormat, KeycloakAuthrorizationResponse };
