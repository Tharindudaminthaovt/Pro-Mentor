/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { RequestValidationError } from "../errors/custom_exceptions/requrest-validation-error";

/**
 * this is middleware to validate the request body using express-validator
 * it will check the validation result of the request body
 * this middleware should be used after the validation chain middleware of express-validator
 * the validation chain middleware of express-validator will add the validation result to the request object
 * @see https://express-validator.github.io/docs/
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns the next function if the request body is valid
 * @throws RequestValidationError if the request body is not valid
 */
const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    // if the request body is not valid, throw an error
    if (!result.isEmpty()) {
        console.error("Error validating request body: ", result.array());
        return next(new RequestValidationError(result.array()));
    }

    next();
};

export {
    requestValidationMiddleware
};
