import { ValidationError } from "express-validator";

import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for express-validator request validation error
 * @extends CustomError
 */
class RequestValidationError extends CustomError {
    statusCode = 422;

    errorCode = ErrorCode.UNPROCESSABLE_ENTITY;

    constructor(private validationErrors: ValidationError[]) {
        super(validationErrors.toString());

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeErrors(): { message: string; field?: string }[] {
        return this.validationErrors.map((err) => {
            // if error type is field set field property
            if (err.type === "field") {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}

export {
    RequestValidationError
};
