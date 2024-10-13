import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for invalid url exception
 * @extends CustomError
 */
class InvalidURLException extends CustomError {
    statusCode = 400;

    errorCode = ErrorCode.INVALID_URL;

    constructor() {
        super("Bad Request: Invalid URL");

        Object.setPrototypeOf(this, InvalidURLException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Bad Request: Invalid URL" }];
    }
}

export {
    InvalidURLException
};
