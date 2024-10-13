import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for axios exception
 * @extends CustomError
 */
class AxiosException extends CustomError {
    statusCode: number;

    errorCode: ErrorCode;

    message: string;

    constructor(message: string, errorCode: ErrorCode, statusCode: number) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, AxiosException.prototype);
    }

    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: this.message }];
    }
}

export {
    AxiosException
};
