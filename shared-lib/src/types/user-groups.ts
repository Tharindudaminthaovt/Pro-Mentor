/**
 * User Groups are used to identify the user groups in the application.
 * These error codes are used to identify the groups available in the keycloak.
 * @enum {string}
 */
enum UserGroups {
    LECTURER = "lecturer",
    ADMIN = "admin",
    IT_DEPARTMENT = "it-department",
    STUDENT = "student",
    CLASS = "class",
    DEGREE_PROGRAM = "degree-program",
    SCHOOL = "school",
}

export {
    UserGroups
};