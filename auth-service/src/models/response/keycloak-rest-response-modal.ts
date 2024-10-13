import { ResponseBodyFormat } from "@promentor-app/shared-lib";

/**
 * this is response body object for keycloak user token
 */
interface KeycloakGetTokenResponse extends ResponseBodyFormat {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    not_before_policy: number;
    session_state: string;
    scope: string;
}

/**
 * this is response body object for keycloak get group
 */
interface KeycloakGetGroupResponse extends ResponseBodyFormat {
    id: string;
    name: string;
    path: string;
    subGroups: KeycloakGetGroupResponse[];
}

/**
 * this is response body object for keycloak get group by id
 */
interface KeycloakGetGroupByIdResponse extends ResponseBodyFormat {
    id: string;
    name: string;
    path: string;
    attributes: unknown;
    realmRoles: [];
    clientRoles: unknown;
    subGroups: KeycloakGetGroupByIdResponse[];
    access: {
        view: boolean;
        viewMembers: boolean;
        manageMembers: boolean;
        manage: boolean;
        manageMembership: boolean;
    };
}

/**
 * this is response body object for keycloak get user by id
 */
interface KeycloakGetUserByIdResponse extends ResponseBodyFormat {
    id: string;
    createdTimestamp: number;
    username: string;
    enabled: boolean;
    totp: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    disableableCredentialTypes: string[];
    requiredActions: string[];
    notBefore: number;
    access: {
        manageGroupMembership: boolean;
        view: boolean;
        mapRoles: boolean;
        impersonate: boolean;
        manage: boolean;
    };
}

interface KeycloakGetUserGroupResponse extends ResponseBodyFormat {
    id: string;
    name: string;
    path: string;
}

export {
    KeycloakGetGroupResponse,
    KeycloakGetTokenResponse,
    KeycloakGetGroupByIdResponse,
    KeycloakGetUserByIdResponse,
    KeycloakGetUserGroupResponse,
};
