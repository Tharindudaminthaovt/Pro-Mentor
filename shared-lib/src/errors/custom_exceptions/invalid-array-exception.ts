import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for invalid url exception
 * @extends CustomError
 */
class InvalidArrayException extends CustomError {
    statusCode = 400;

    errorCode = ErrorCode.INVALID_ARRAY;

    constructor() {
        super("Bad Request: Invalid Array");

        Object.setPrototypeOf(this, InvalidArrayException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Bad Request: Invalid Array" }];
    }
}

export {
    InvalidArrayException
};
