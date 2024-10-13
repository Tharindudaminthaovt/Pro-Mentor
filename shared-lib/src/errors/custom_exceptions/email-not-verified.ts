import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for email not verified exception
 * @extends CustomError
 */
class EmailNotVerfied extends CustomError {
    statusCode = 401;

    errorCode = ErrorCode.EMAIL_NOT_VERIFIED;

    constructor() {
        super("Account email is not verified");

        Object.setPrototypeOf(this, EmailNotVerfied.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Account email is not verified" }];
    }
}

export {
    EmailNotVerfied
};
