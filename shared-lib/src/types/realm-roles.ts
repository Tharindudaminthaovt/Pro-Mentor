/**
 * Realm roals are used to identify the user permissions in the application.
 * These roal codes are used to identify the user permissions available in the keycloak.
 * @enum {string}
 */
enum RealmRoals {
    AccountAdmin = "account-admin",
    ADMIN = "admin",
    LECTURER = "lecture",
    STUDENT = "student",
    USER = "user",
    RESOURCES_MANAGEMENT = "resources-management"
}

    
export {
    RealmRoals
};