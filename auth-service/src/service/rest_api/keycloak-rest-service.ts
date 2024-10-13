import { ResponseBodyFormat, invokeRestEndpoint } from "@promentor-app/shared-lib";

import {
    KeycloakCreateUserRequest,
    KeycloakUpdateUserByIdRequest,
    KycloakGetUserTokenRequestBody,
} from "../../models/request/keycloak-requrest-model";
import {
    KeycloakGetGroupByIdResponse,
    KeycloakGetGroupResponse,
    KeycloakGetTokenResponse,
    KeycloakGetUserByIdResponse,
    KeycloakGetUserGroupResponse,
} from "../../models/response/keycloak-rest-response-modal";

/**
 * this function creates a user in a given keycloak tenant
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param body the body of the request
 * @param authToken the auth token
 * @returns a promise of void
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const user: KeycloakCreateUserRequest = {
 *      username,
 *      email,
 *      firstName,
 *      lastName,
 *      enabled: true,
 *      groups: ["student"],
 *      credentials: [
 *          {
 *              type: "password",
 *              temporary: true,
 *              value: tempPassword,
 *          },
 *      ],
 *      access: {
 *          manageGroupMembership: true,
 *          view: true,
 *          mapRoles: true,
 *          impersonate: true,
 *          manage: true,
 *      },
 * };
 *
 * await createUserInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      user,
 *      req.headers.authorization as string
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const createUserInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    body: KeycloakCreateUserRequest,
    authToken: string
) => {
    await invokeRestEndpoint<ResponseBodyFormat>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users`,
        "POST",
        body,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function updates a user in a given keycloak tenant
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param body the body of the request
 * @param authToken the auth token
 * @param userId the user id
 * @returns a promise of void
 * @throws an error if the request fails
 * @example
 * ```typescript
 *  const user: KeycloakUpdateUserByIdRequest = {
 *      firstName,
 *      lastName,
 *      email,
 *      enabled: true,
 *  };
 *
 *  await updateUserInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      user,
 *      req.headers.authorization as string,
 *      userId
 *  );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const updateUserInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    body: KeycloakUpdateUserByIdRequest,
    authToken: string,
    userId: string
) => {
    await invokeRestEndpoint<ResponseBodyFormat>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users/${userId}`,
        "PUT",
        body,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function gets a user in a given keycloak tenant
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param userId the user id
 * @returns the user
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const user = await getUserByIdInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *      userId
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const getUserByIdInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    userId: string
): Promise<KeycloakGetUserByIdResponse | undefined> => {
    return invokeRestEndpoint<KeycloakGetUserByIdResponse>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users/${userId}`,
        "GET",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function gets a user token in a given keycloak tenant
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param body the body of the request
 * @returns the user token
 * @throws an error if the request fails
 * @example
 * ```typescript
 *  const userToken = await getUserTokenInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      {
 *          client_id: "admin-cli",
 *          grant_type: "password",
 *          username: "admin",
 *          password: "admin",
 *      }
 *  );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html}
 */
const getUserTokenInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    body: KycloakGetUserTokenRequestBody
): Promise<KeycloakGetTokenResponse | undefined> => {
    return invokeRestEndpoint<KeycloakGetTokenResponse>(
        `${keyclockIdpServerUrl}/realms/${keyTenant}/protocol/openid-connect/token`,
        "POST",
        body,
        {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    );
};

/**
 * this function gets a group in a given keycloak tenant
 * according to group names after searching
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param groupName the group name
 * @returns the group
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const group = await getGroupInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *      groupName
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_groups_resource}
 */
const getGroupInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    groupName: string
): Promise<KeycloakGetGroupResponse[] | undefined> => {
    return invokeRestEndpoint<KeycloakGetGroupResponse[]>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/groups?search=${groupName}&exact=true`,
        "GET",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function gets a group in a given keycloak tenant according to group id
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param groupId the group id
 * @returns the group
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const group = await getGroupByIdInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *      groupId
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_groups_resource}
 */
const getGroupByIdInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    groupId: string
): Promise<KeycloakGetGroupByIdResponse | undefined> => {
    return invokeRestEndpoint<KeycloakGetGroupByIdResponse>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/groups/${groupId}`,
        "GET",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function gets a user groups assign to the given user in a given keycloak tenant according to user id
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param userId the user id
 * @returns the user groups
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const userGroups = await getUserGroupsByUserIdInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *  userId
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const getUserGroupsByUserIdInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    userId: string
): Promise<KeycloakGetUserGroupResponse[] | undefined> => {
    return invokeRestEndpoint<KeycloakGetUserGroupResponse[]>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users/${userId}/groups`,
        "GET",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function assigns a group to a user in a given keycloak tenant according to user id and group id
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param userId the user id
 * @param groupId the group id
 * @returns a promise of void
 * @throws an error if the request fails
 * @example
 * ```typescript
 * await assignGroupToUserInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *      userId,
 *      groupId
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const assignGroupToUserInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    userId: string,
    groupId: string
) => {
    await invokeRestEndpoint<ResponseBodyFormat>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users/${userId}/groups/${groupId}`,
        "PUT",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

/**
 * this function removes a group from a user in a given keycloak tenant according to user id and group id
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param authToken the auth token
 * @param userId the user id
 * @param groupId the group id
 * @returns a promise of void
 * @throws an error if the request fails
 * @example
 * ```typescript
 * await removeGroupFromUserInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      req.headers.authorization as string,
 *      userId,
 *      groupId
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html#_users_resource}
 */
const removeGroupFromUserInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    authToken: string,
    userId: string,
    groupId: string
) => {
    await invokeRestEndpoint<ResponseBodyFormat>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users/${userId}/groups/${groupId}`,
        "DELETE",
        undefined,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

export {
    createUserInGivenKeyCloakTenant,
    getUserTokenInGivenKeyCloakTenant,
    getGroupInGivenKeyCloakTenant,
    getGroupByIdInGivenKeyCloakTenant,
    getUserByIdInGivenKeyCloakTenant,
    updateUserInGivenKeyCloakTenant,
    getUserGroupsByUserIdInGivenKeyCloakTenant,
    assignGroupToUserInGivenKeyCloakTenant,
    removeGroupFromUserInGivenKeyCloakTenant,
};
