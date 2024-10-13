/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";

import { UnauthorizeAccessException } from "../errors/custom_exceptions/unauthorize-access-exception";
import { EmailNotVerfied } from "../errors/custom_exceptions/email-not-verified";

/**
 * this is middleware to check the user is authorized or not
 * it will check the currentUser property of the request object
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns the next function if the request is authorized
 * @throws UnauthorizeAccessException if the authorization header is not defined
 * @throws EmailNotVerfied if the email is not verified
 */
const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // if the currentUser property is not defined or the user is not active, throw an error
    if (!req.currentUser || !req.currentUser.active) {
        return next(new UnauthorizeAccessException());
    }

    // if the email is not verified, throw an error
    if (!req.currentUser.email_verified) {
        return next(new EmailNotVerfied())
    }

    next();
};

export {
    requireAuthMiddleware
};
