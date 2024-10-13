/**
 * @description HttpContentType is a type that represents the possible values for the Content-Type header in a HTTP request.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
type HttpContentType =
    | "text/html"
    | "text/plain"
    | "multipart/form-data"
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "application/octet-stream";

/**
 * @description HttpRequestHeaders is a type that represents the possible values for the headers in a HTTP request.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */
type HttpRequestHeaders = {
    "Content-Type": HttpContentType;
    Authorization?: string;
};

export { HttpRequestHeaders, HttpContentType };
