import { CustomError } from "../custom-error";
import { ErrorCode } from "../error-codes";

/**
 * this is a custom error class for image upload path not found
 * when try to upload image, if the request doesn't have the uploaded image path this throws
 * @extends CustomError
 */
class ImagePathNotFoundException extends CustomError {
    statusCode = 400;

    errorCode = ErrorCode.IMAGE_PATH_NOT_FOUND;

    constructor() {
        super("Somthing wrong. Image path not found");

        Object.setPrototypeOf(this, ImagePathNotFoundException.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    public serializeErrors(): { message: string; field?: string }[] {
        return [{ message: "Somthing wrong. Image path not found" }];
    }
}

export {
    ImagePathNotFoundException
};
