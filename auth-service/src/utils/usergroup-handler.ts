/**
 * this function returns the full path of the groups in keycloak
 * @param groups user groups array
 * @param prefix keycloak base group path prefix
 * @returns the full path of the groups
 * @example
 * ```typescript
 * const groups = ["2025", "2026-A"];
 * const prefix = "class";
 * const result = getUserGropsWithFullPath(groups, prefix);
 * console.log(result);
 * // ["/class/2025", "/class/2026-A"]
 * ```
 */
const getUserGropsWithFullPath = (groups: string[], prefix: string): string[] => {
    return groups.map((group) => `/${prefix}/${group}`);
};

// eslint-disable-next-line import/prefer-default-export
export { getUserGropsWithFullPath };
