import { Group } from "./group";

interface StudentCreateRequest {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    studentClass?: string[];
    degreeProgram?: string[];
    school?: string[];
}

interface StudentUpdateRequest {
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    enabled?: boolean;
}

interface CreateStudentResponse {
    message: string;
}

interface UpdateStudentResponse {
    message: string;
}

interface GetStudentsResponse {
    id: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    firstName?: string;
    lastName?: string;
    username: string;
}

interface StudentGetByIdResponse {
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

interface GetStudentsCountResponse {
    count: number;
}

interface AddStudentToGroupRequest {
    groups: string[];
}

interface AddGroupToStudentResponse {
    message: string;
}

interface RemoveStudentFromGroupRequest {
    groups: string[];
}

interface RemoveGroupFromStudentResponse {
    message: string;
}

export { StudentCreateRequest, StudentGetByIdResponse, CreateStudentResponse, UpdateStudentResponse, GetStudentsResponse, StudentUpdateRequest, GetStudentsCountResponse, AddGroupToStudentResponse, AddStudentToGroupRequest, RemoveGroupFromStudentResponse, RemoveStudentFromGroupRequest };