/**
 * this is the response model for the keycloak db response for user filter
 */
interface KeycloakFilterUsersResponse {
    id: string;
    email?: string;
    email_constraint?: string;
    email_verified?: boolean;
    enabled?: boolean;
    federation_link?: string;
    first_name?: string;
    last_name?: string;
    realm_id?: string;
    username?: string;
    created_timestamp?: string;
    service_account_client_link?: string;
    not_before?: number;
    user_id?: string;
}

/**
 * this is the response model for the keycloak db response for user filter count
 */
interface KeycloakFilterUsersCountResponse {
    count: number;
}

export { KeycloakFilterUsersResponse, KeycloakFilterUsersCountResponse };
