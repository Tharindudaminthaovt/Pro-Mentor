/* eslint-disable no-param-reassign */

import { Express } from "express";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Locals {
            port?: number;
            host: string;
        }
    }
}

/**
 * this is for setting up the locals for the app
 * @param app this is the express app
 */

const setLocals = (app: Express) => {
    app.locals.port = 8081;
    app.locals.host = "localhost";
};

export { setLocals };
