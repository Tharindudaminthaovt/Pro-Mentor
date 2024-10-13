import { globalErrorHandleMiddleware } from "@promentor-app/shared-lib";
import express from "express";

const app = express();

app.use(globalErrorHandleMiddleware);

export default app;