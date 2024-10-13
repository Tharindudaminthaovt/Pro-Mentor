import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for route not found exception
 * @extends CustomError
 */
class RouteNotFoundException extends CustomError {
    statusCode = 404;

    errorCode = ErrorCode.ROUTE_NOT_FOUND;

    constructor() {
        super("Route not found");

        Object.setPrototypeOf(this, RouteNotFoundException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Route not found" }];
    }
}

export {
    RouteNotFoundException
};
