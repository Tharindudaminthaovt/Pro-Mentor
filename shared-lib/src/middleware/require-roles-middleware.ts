/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";

import { KeycloakAuthrorizationResponse } from "../proxy/request_formats/response-format";

import { UnauthorizeAccessException } from "../errors/custom_exceptions/unauthorize-access-exception";
import { EmailNotVerfied } from "../errors/custom_exceptions/email-not-verified";

/**
 * this is middleware to check the user is authorized or not with roles
 * it will check the currentUser property of the request object
 * @param roles the roles to check
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns the next function if the request is authorized with the roles
 * @throws UnauthorizeAccessException if the authorization header is not defined
 * @throws UnauthorizeAccessException if the user does not have at least one of the role required
 * @throws UnauthorizeAccessException if the user is not active
 * @throws UnauthorizeAccessException if the user is not defined
 * @throws EmailNotVerfied if the user email is not verified
 */
const requireRolesMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const currentUser = req.currentUser as KeycloakAuthrorizationResponse;

        // if the currentUser property is not defined or the user is not active, throw an error
        if (!currentUser || !currentUser.active) {
            return next(new UnauthorizeAccessException());
        }

        // if the email is not verified, throw an error
        if (!currentUser.email_verified) {
            return next(new EmailNotVerfied())
        }

        // if not defined at least one role to check, return next
        if (!roles || roles.length === 0) {
            return next();
        }

        // get the user roles from the currentUser property
        const userRoles = currentUser.realm_access?.roles;


        // if the user does not have roles, throw an error
        if (!userRoles) {
            return next(new UnauthorizeAccessException());
        }

        // if the user does not have at least one of the role required, throw an error
        if (!roles.some((role) => userRoles.includes(role))) {
            return next(new UnauthorizeAccessException());
        }

        next();
    };
};

export {
    requireRolesMiddleware
};
