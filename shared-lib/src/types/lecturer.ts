import { Group } from "./group";

interface LecturerCreateRequest {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    studentClass?: string[];
    degreeProgram?: string[];
    school?: string[];
}

interface LecturerUpdateRequest {
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    enabled?: boolean;
}

interface CreateLecturerResponse {
    message: string;
}

interface UpdateLecturerResponse {
    message: string;
}

interface GetLecturerResponse {
    id: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    firstName?: string;
    lastName?: string;
    username: string;
}

interface LecturerGetByIdResponse {
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

interface GetLecturerCountResponse {
    count: number;
}

interface AddLecturerToGroupRequest {
    groups: string[];
}

interface AddGroupToLecturerResponse {
    message: string;
}

interface RemoveLecturerFromGroupRequest {
    groups: string[];
}

interface RemoveGroupFromLecturerResponse {
    message: string;
}

export { LecturerCreateRequest, LecturerGetByIdResponse, CreateLecturerResponse, UpdateLecturerResponse, GetLecturerResponse, LecturerUpdateRequest, GetLecturerCountResponse, AddGroupToLecturerResponse, AddLecturerToGroupRequest, RemoveGroupFromLecturerResponse, RemoveLecturerFromGroupRequest };