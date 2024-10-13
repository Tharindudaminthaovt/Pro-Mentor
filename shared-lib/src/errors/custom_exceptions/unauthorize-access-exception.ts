import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";


class UnauthorizeAccessException extends CustomError {
    statusCode = 401;

    errorCode = ErrorCode.UNAUTHORIZED_ACCESS;

    constructor() {
        super("Unauthorized Access");

        Object.setPrototypeOf(this, UnauthorizeAccessException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Unauthorize Access" }];
    }
}

export {
    UnauthorizeAccessException
};
