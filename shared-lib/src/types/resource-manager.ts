import { Group } from "./group";

interface ResourceManagerCreateRequest {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
}

interface ResourceManagerUpdateRequest {
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    enabled?: boolean;
}

interface CreateResourceManagerResponse {
    message: string;
}

interface UpdateResourceManagerResponse {
    message: string;
}

interface GetResourceManagersResponse {
    id: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    firstName?: string;
    lastName?: string;
    username: string;
}

interface ResourceManagerGetByIdResponse {
    id: string,
    createdTimestamp?: string,
    username: string,
    enabled: boolean,
    emailVerified: boolean,
    firstName?: string;
    lastName?: string,
    email: string,
    contactNumber?: string,
    profileUrl?: string,
    groups?: Group[]
}

interface GetResourceManagersCountResponse {
    count: number;
}

interface AddResourceManagerToGroupRequest {
    groups: string[];
}

interface AddGroupToResourceManagerResponse {
    message: string;
}

interface RemoveResourceManagerFromGroupRequest {
    groups: string[];
}

interface RemoveGroupFromResourceManagerResponse {
    message: string;
}

export { ResourceManagerCreateRequest, ResourceManagerGetByIdResponse, CreateResourceManagerResponse, UpdateResourceManagerResponse, GetResourceManagersResponse, ResourceManagerUpdateRequest, GetResourceManagersCountResponse, AddGroupToResourceManagerResponse, AddResourceManagerToGroupRequest, RemoveGroupFromResourceManagerResponse, RemoveResourceManagerFromGroupRequest };