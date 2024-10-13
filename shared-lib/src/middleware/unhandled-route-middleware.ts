import { NextFunction, Request, Response } from "express";

import { RouteNotFoundException } from "../errors/custom_exceptions/route-not-found-exception";

/**
 * this is a middleware to handle unhandled routes
 * it will throw a RouteNotFoundException
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns throws a RouteNotFoundException
 * @example
 * app.use(unhandledRouteMiddleware);
 */
const unhandledRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next(new RouteNotFoundException());
};

export { unhandledRouteMiddleware };
