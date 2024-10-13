import { requestValidationMiddleware } from "@promentor-app/shared-lib";
import { Router } from "express";
import { body } from "express-validator";

import { getAccessTokenForTheUser } from "../controllers/api-test-controller";

const router = Router();

router.post(
    "/get-access-token",
    [
        body("username").trim().isString().notEmpty().withMessage("username is required"),
        body("password").trim().isString().notEmpty().withMessage("password is required"),
    ],
    requestValidationMiddleware,
    getAccessTokenForTheUser
);

export default router;
