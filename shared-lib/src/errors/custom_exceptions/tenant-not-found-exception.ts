import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for tenant not found exception
 * @extends CustomError
 */
class TenantNotFoundException extends CustomError {
    statusCode = 404;

    errorCode = ErrorCode.TENANT_NOT_FOUND;

    constructor() {
        super("Tenant not found");

        Object.setPrototypeOf(this, TenantNotFoundException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Tenant not found" }];
    }
}

export {
    TenantNotFoundException
};
