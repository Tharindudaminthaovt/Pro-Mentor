import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";


/**
 * this is a custom error class
 * @extends CustomError
 */
class CustomException extends CustomError {
    statusCode: number;

    errorCode: ErrorCode;

    message: string;

    constructor(message: string, errorCode: ErrorCode, statusCode: number) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, CustomException.prototype);
    }

    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: this.message }];
    }
}

export {
    CustomException,
};
