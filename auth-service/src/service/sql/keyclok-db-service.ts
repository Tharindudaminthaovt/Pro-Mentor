import { pgConnectionWrapper } from "@promentor-app/shared-lib";

import {
    KeycloakFilterUsersCountResponse,
    KeycloakFilterUsersResponse,
} from "../../models/response/keycloak-db-response-modal";

/**
 * this function queries the keycloak db and returns the users
 * this function does not care about the state of the user (active or inactive)
 * this function contains the pagination logic
 * this check the if the user is in the given all the groups and matches the search value
 * @param tenantId the id of the tenant in the keycloak db (uuid)
 * @param groups groups of the user
 * @param searchValue search value
 * @param limit the limit of the result
 * @param offset the offset of the result
 * @returns returns a promise of KeycloakFilterUsersResponse[]
 * @throws an error if the request fails
 */
const queryAndSearchUsersWithoutState = async (
    tenantId: string,
    groups: string[],
    searchValue: string,
    limit: number = 10,
    offset: number = 0
): Promise<KeycloakFilterUsersResponse[]> => {
    console.debug(
        "tenantId: ",
        tenantId,
        "groups: ",
        groups,
        "searchValue: ",
        searchValue,
        "limit: ",
        limit,
        "offset: ",
        offset
    );

    try {
        const query = `
        SELECT id, email, email_verified, enabled, first_name, last_name, username FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership 
                WHERE group_id IN (${groups.map((_, index) => `$${index + 9}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g 
        ON u.id = g.user_id 
        WHERE
            u.realm_id = $2 
                AND
            (
                u.email ILIKE '%' || $3 || '%' OR
                u.first_name ILIKE '%' || $4 || '%' OR
                u.last_name ILIKE '%' || $5 || '%' OR
                u.username ILIKE '%' || $6 || '%'
            )
        LIMIT $7 
        OFFSET $8;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            groups.length,
            tenantId,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            limit,
            offset,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows as KeycloakFilterUsersResponse[];
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the users
 * this function cares about the state of the user (active or inactive)
 * this function contains the pagination logic
 * this check the if the user is in the given all the groups and matches the search value
 * @param tenantId the id of the tenant in the keycloak db (uuid)
 * @param groups groups of the user
 * @param searchValue search value
 * @param active the state of the user (active or inactive)
 * @param limit the limit of the result
 * @param offset the offset of the result
 * @returns returns a promise of KeycloakFilterUsersResponse[]
 * @throws an error if the request fails
 */
const queryAndSearchUsersWithStatus = async (
    tenantId: string,
    groups: string[],
    searchValue: string,
    active: boolean,
    limit: number = 10,
    offset: number = 0
): Promise<KeycloakFilterUsersResponse[]> => {
    console.debug(
        "tenantId: ",
        tenantId,
        "groups: ",
        groups,
        "searchValue: ",
        searchValue,
        "active: ",
        active,
        "limit: ",
        limit,
        "offset: ",
        offset
    );

    try {
        const query = `SELECT id, email, email_verified, enabled, first_name, last_name, username FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership 
                WHERE group_id IN (${groups.map((_, index) => `$${index + 10}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g  
        ON u.id = g.user_id 
        WHERE 
            u.realm_id = $2
                AND 
            u.enabled = $3 
                AND 
            (
                u.email ILIKE '%' || $4 || '%' OR
                u.first_name ILIKE '%' || $5 || '%' OR
                u.last_name ILIKE '%' || $6 || '%' OR
                u.username ILIKE '%' || $7 || '%'
            ) 
        LIMIT $8 
        OFFSET $9;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            groups.length,
            tenantId,
            active,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            limit,
            offset,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows as KeycloakFilterUsersResponse[];
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the users
 * this function does not care about the state of the user (active or inactive)
 * this function contains the pagination logic
 * this check the if the user is in the given all the groups
 * this function is does not check the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups groups of the user
 * @param limit the limit of the result
 * @param offset the offset of the result
 * @returns returns a promise of KeycloakFilterUsersResponse[]
 * @throws an error if the request fails
 */
const queryUsersWithoutState = async (
    tenantId: string,
    groups: string[],
    limit: number = 10,
    offset: number = 0
): Promise<KeycloakFilterUsersResponse[]> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups, "limit: ", limit, "offset: ", offset);

    try {
        const query = `
        SELECT id, email, email_verified, enabled, first_name, last_name, username FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership
                WHERE group_id IN (${groups.map((_, index) => `$${index + 5}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $2) AS g 
        ON u.id = g.user_id  
        WHERE 
            u.realm_id = $1 
        LIMIT $3
        OFFSET $4;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            tenantId,
            groups.length,
            limit,
            offset,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows as KeycloakFilterUsersResponse[];
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the users
 * this function cares about the state of the user (active or inactive)
 * this function contains the pagination logic
 * this check the if the user is in the given all the groups
 * this function is does not check the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups the groups of the user
 * @param active the state of the user (active or inactive)
 * @param limit the limit of the result
 * @param offset the offset of the result
 * @returns returns a promise of KeycloakFilterUsersResponse[]
 * @throws an error if the request fails
 */
const queryUsersWithStatus = async (
    tenantId: string,
    groups: string[],
    active: boolean,
    limit: number = 10,
    offset: number = 0
): Promise<KeycloakFilterUsersResponse[]> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups, "active: ", active, "limit: ", limit, "offset: ", offset);

    try {
        const query = `SELECT id, email, email_verified, enabled, first_name, last_name, username FROM public.user_entity AS u 
            INNER JOIN (
                SELECT user_id FROM public.user_group_membership 
                    WHERE group_id IN (${groups.map((_, index) => `$${index + 6}`).join(", ")}
            ) 
            GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g 
            ON u.id = g.user_id  
            WHERE 
                u.realm_id = $2
                    AND 
                u.enabled = $3 
            LIMIT $4
            OFFSET $5;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            groups.length,
            tenantId,
            active,
            limit,
            offset,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows as KeycloakFilterUsersResponse[];
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the count of the users
 * this function does not care about the state of the user (active or inactive)
 * this check the if the user is in the given all the groups and matches the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups the groups of the user
 * @param searchValue the search value
 * @returns returns a promise of KeycloakFilterUsersCountResponse
 * @throws an error if the request fails
 */
const queryAndSearchUsersCountWithoutState = async (
    tenantId: string,
    groups: string[],
    searchValue: string
): Promise<KeycloakFilterUsersCountResponse> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups, "searchValue: ", searchValue);

    try {
        const query = `
        SELECT COUNT(id) AS count FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership 
                WHERE group_id IN (${groups.map((_, index) => `$${index + 7}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g 
        ON u.id = g.user_id 
        WHERE
            u.realm_id = $2 
                AND
            (
                u.email ILIKE '%' || $3 || '%' OR
                u.first_name ILIKE '%' || $4 || '%' OR
                u.last_name ILIKE '%' || $5 || '%' OR
                u.username ILIKE '%' || $6 || '%'
            )
        ;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            groups.length,
            tenantId,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows[0] as KeycloakFilterUsersCountResponse;
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the count of the users
 * this function cares about the state of the user (active or inactive)
 * this check the if the user is in the given all the groups and matches the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups the groups of the user
 * @param searchValue the search value
 * @param active the state of the user (active or inactive)
 * @returns returns a promise of KeycloakFilterUsersCountResponse
 * @throws an error if the request fails
 */
const queryAndSearchUsersCountWithStatus = async (
    tenantId: string,
    groups: string[],
    searchValue: string,
    active: boolean
): Promise<KeycloakFilterUsersCountResponse> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups, "searchValue: ", searchValue, "active: ", active);

    try {
        const query = `SELECT COUNT(id) AS count FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership 
                WHERE group_id IN (${groups.map((_, index) => `$${index + 8}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g  
        ON u.id = g.user_id 
        WHERE 
            u.realm_id = $2
                AND 
            u.enabled = $3 
                AND 
            (
                u.email ILIKE '%' || $4 || '%' OR
                u.first_name ILIKE '%' || $5 || '%' OR
                u.last_name ILIKE '%' || $6 || '%' OR
                u.username ILIKE '%' || $7 || '%'
            ) 
        ;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [
            groups.length,
            tenantId,
            active,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            ...groups,
        ]);

        console.debug("result: ", result);
        return result.rows[0] as KeycloakFilterUsersCountResponse;
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the count of the users
 * this function does not care about the state of the user (active or inactive)
 * this check the if the user is in the given all the groups
 * this function is does not check the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups the groups of the user
 * @returns returns a promise of KeycloakFilterUsersCountResponse
 * @throws an error if the request fails
 */
const queryUsersCountWithoutState = async (
    tenantId: string,
    groups: string[]
): Promise<KeycloakFilterUsersCountResponse> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups);

    try {
        const query = `
        SELECT COUNT(id) AS count FROM public.user_entity AS u 
        INNER JOIN (
            SELECT user_id FROM public.user_group_membership
                WHERE group_id IN (${groups.map((_, index) => `$${index + 3}`).join(", ")}
        ) 
        GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $2) AS g 
        ON u.id = g.user_id  
        WHERE 
            u.realm_id = $1 
        ;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [tenantId, groups.length, ...groups]);

        return result.rows[0] as KeycloakFilterUsersCountResponse;
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the count of the users
 * this function cares about the state of the user (active or inactive)
 * this check the if the user is in the given all the groups
 * this function is does not check the search value
 * @param tenantId id of the tenant in the keycloak db
 * @param groups the groups of the user
 * @param active the state of the user (active or inactive)
 * @returns returns a promise of KeycloakFilterUsersCountResponse
 * @throws an error if the request fails
 */
const queryUsersCountWithStatus = async (
    tenantId: string,
    groups: string[],
    active: boolean
): Promise<KeycloakFilterUsersCountResponse> => {
    console.debug("tenantId: ", tenantId, "groups: ", groups, "active: ", active);

    try {
        const query = `SELECT COUNT(id) AS count FROM public.user_entity AS u 
            INNER JOIN (
                SELECT user_id FROM public.user_group_membership 
                    WHERE group_id IN (${groups.map((_, index) => `$${index + 4}`).join(", ")}
            ) 
            GROUP BY user_id HAVING COUNT(DISTINCT group_id) = $1) AS g 
            ON u.id = g.user_id  
            WHERE 
                u.realm_id = $2
                    AND 
                u.enabled = $3 
            ;`;

        const result = await pgConnectionWrapper.pgPool.query(query, [groups.length, tenantId, active, ...groups]);

        console.debug("result: ", result);
        return result.rows[0] as KeycloakFilterUsersCountResponse;
    } catch (error) {
        console.error("error: ", (error as Error).message);
        throw error;
    }
};

/**
 * this function queries the keycloak db and returns the id of the tenant
 * this function is used to get the id of the tenant in the keycloak db
 * @param tenantIdName the name of the tenant in the keycloak db
 * @returns the id of the tenant (uuid)
 * @throws an error if the request fails
 */
const getTenantId = async (tenantIdName: string) => {
    const query = "SELECT id FROM public.realm WHERE name = $1;";

    try {
        const result = await pgConnectionWrapper.pgPool.query(query, [tenantIdName]);
        console.debug("result: ", result);

        if (!result.rowCount || result.rowCount < 1) {
            // need to change
            throw new Error("Tenant Id not found");
        }

        return result.rows[0].id;
    } catch (error) {
        console.log("error: ", (error as Error).message);
        throw error;
    }
};

export {
    queryUsersWithoutState,
    queryUsersWithStatus,
    queryAndSearchUsersWithStatus,
    queryAndSearchUsersWithoutState,
    queryUsersCountWithoutState,
    queryUsersCountWithStatus,
    queryAndSearchUsersCountWithStatus,
    queryAndSearchUsersCountWithoutState,
    getTenantId,
};
