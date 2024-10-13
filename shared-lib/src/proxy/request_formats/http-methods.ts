/**
 * @description HttpMethod is a type that represents the possible values for the method in a HTTP request.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
type HttpMethod =
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "purge"
    | "PURGE"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK";

export {
    HttpMethod,
};
