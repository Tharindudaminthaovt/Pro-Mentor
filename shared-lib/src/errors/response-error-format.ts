import { ErrorCode } from "./error-codes";

/**
 * this is a response error format class
 * it is used to send a proper response to the client
 * @param errors array of errors
 * @param errorCode specific error code of the error
 * @example
 * const errorResponse = new ResponseErrorFormat([{ message: "error message" }], ErrorCode.INTERNAL_SERVER_ERROR);
 */
class ResponseErrorFormat {
    constructor(
        public errors: { message: string; field?: string }[],
        public errorCode: ErrorCode
    ) {}
}

export {
    ResponseErrorFormat
};
