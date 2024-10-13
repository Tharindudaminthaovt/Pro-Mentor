import { NextFunction, Request, Response } from "express";

import { CustomError } from "../errors/custom-error";
import { ResponseErrorFormat } from "../errors/response-error-format";
import { ErrorCode } from "../errors/error-codes";

/**
 * this is a global exception handler middleware
 * it will catch all the errors thrown by the application
 * and send a proper response to the client
 * @param err error object
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns if headers are already sent, it will call next function. Otherwise, it will send a proper response to the client
 * @example
 * app.use(globalErrorHandleMiddleware);
 */
const globalErrorHandleMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        console.debug("Headers already sent, skipping global error handler");
        return next(err);
    }

    let errorResponse: ResponseErrorFormat;

    // if the error is an instance of CustomError, it means that it is a known error
    // so we can send a proper response to the client
    if (err instanceof CustomError) {
        errorResponse = { errors: err.serializeErrors(), errorCode: err.errorCode };
        console.error("Error caught in global error handler: ", errorResponse);
        return res.status(err.statusCode).json(errorResponse);
    }

    errorResponse = {
        errors: [{ message: err.message || "Something went wrong" }],
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
    };

    console.error("Unhandled Error caught in global error handler: ", err);

    return res.status(500).json(errorResponse);
};

export {
    globalErrorHandleMiddleware
};
