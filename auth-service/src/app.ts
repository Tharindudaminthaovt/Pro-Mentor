import express from "express";

import {
    unhandledRouteMiddleware,
    globalErrorHandleMiddleware,
    requireAuthMiddleware,
} from "@promentor-app/shared-lib";

import configApplicationMiddleware from "./middleware/application-middleware-config";

import helloRouter from "./routes/hello-routes";
import rootRouter from "./routes/root-router";

const app = express();

// configer the application middlewares
configApplicationMiddleware(app);

app.use("/hello", helloRouter);

// set the routers
app.use("/api/v1/auth", rootRouter);

// require auth middleware
// app.use(requireAuthMiddleware);

// unhandled routes middleware
app.use(unhandledRouteMiddleware);

// global error handler middleware
app.use(globalErrorHandleMiddleware);

export default app;
