import { UserGroups, requestValidationMiddleware } from "@promentor-app/shared-lib";
import { Router } from "express";
import { param } from "express-validator";

import { getSubGroupsInGivenTenant } from "../controllers/group-controller";

const router = Router();

router.get(
    "/:groupName",
    [
        param("groupName")
            .trim()
            .isIn([UserGroups.CLASS, UserGroups.DEGREE_PROGRAM, UserGroups.SCHOOL])
            .withMessage(
                `groupName name should be one of the following: ${UserGroups.CLASS}, ${UserGroups.DEGREE_PROGRAM}, ${UserGroups.SCHOOL}`
            ),
    ],
    requestValidationMiddleware,
    getSubGroupsInGivenTenant
);

export default router;
