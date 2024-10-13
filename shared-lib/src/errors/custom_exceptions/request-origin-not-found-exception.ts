import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";


class RequestOriginNotFoundException extends CustomError {
    statusCode = 401;

    errorCode = ErrorCode.REQUEST_ORIGIN_NOT_FOUND;

    constructor() {
        super("Origin not available in the request");

        Object.setPrototypeOf(this, RequestOriginNotFoundException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Origin not available in the request" }];
    }
}

export {
    RequestOriginNotFoundException
};
