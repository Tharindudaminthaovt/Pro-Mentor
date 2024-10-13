import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for group not found exception
 * @extends CustomError
 */
class GroupNotFoundException extends CustomError {
    statusCode = 404;

    errorCode = ErrorCode.GROUP_NOT_FOUND;

    constructor() {
        super("Group not found");

        Object.setPrototypeOf(this, GroupNotFoundException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Group not found" }];
    }
}

export {
    GroupNotFoundException
};
