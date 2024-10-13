import express from "express";
import path from "path";

import {
    unhandledRouteMiddleware,
    globalErrorHandleMiddleware,
    keycloakAuthMiddleware
} from "@promentor-app/shared-lib";

import resourcesRouter from "./routes/resources-router";

import configApplicationMiddleware from "./middleware/application-middleware-config";

const app = express();

// configer the application middlewares
configApplicationMiddleware(app);

console.log("dirn", __dirname)

app.use("/api/v1/cdn/assets", express.static(path.join(__dirname, "..", "assets")));

// kyecloak auth middleware
app.use(keycloakAuthMiddleware);

app.use("/api/v1/cdn", resourcesRouter);

// unhandled routes middleware
app.use(unhandledRouteMiddleware);

// global error handler middleware
app.use(globalErrorHandleMiddleware);

export default app;
