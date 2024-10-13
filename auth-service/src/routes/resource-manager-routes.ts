import { Router } from "express";
import { body, param, query } from "express-validator";
import { requestValidationMiddleware } from "@promentor-app/shared-lib";

import {
    addGroupsToResourcesManagers,
    createResourceManager,
    getResourceManagerById,
    getResourcesManagers,
    getResourcesManagersCount,
    removeGroupFromResourcesManager,
    updateResourceManager,
} from "../controllers/resource-manager-controller";

const router = Router();

router.post(
    "/",
    [
        body("username").trim().isString().notEmpty().withMessage("username is required"),
        body("email").isEmail().normalizeEmail().withMessage("valid email is required"),
        body("firstName")
            .trim()
            .isString()
            .optional()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
        body("lastName")
            .trim()
            .isString()
            .optional()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
        body("contactNumber").trim().optional(),
    ],
    requestValidationMiddleware,
    createResourceManager
);

router.get(
    "/",
    [
        query("groups").trim(),
        query("limit").trim().optional().isInt().withMessage("Should be a number"),
        query("offset").trim().optional().isInt().withMessage("Should be a number"),
        query("active").trim().optional().isBoolean().withMessage("Should be a boolean"),
        query("search").trim().optional().isString().withMessage("Should be a string"),
    ],
    requestValidationMiddleware,
    getResourcesManagers
);

router.patch(
    "/:id",
    [
        param("id").trim().isUUID(4).withMessage("user Id should be a valid uuid v4"),
        body("email").isEmail().normalizeEmail().withMessage("valid email is required"),
        body("firstName")
            .trim()
            .optional()
            .isString()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
        body("lastName")
            .trim()
            .optional()
            .isString()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
        body("enabled").trim().optional().isBoolean().withMessage("Should be a boolean"),
        body("contactNumber").trim().optional(),
    ],
    requestValidationMiddleware,
    updateResourceManager
);

router.get(
    "/count",
    [
        query("groups").trim(),
        query("active").trim().optional().isBoolean().withMessage("Should be a boolean"),
        query("search").trim().optional().isString().withMessage("Should be a string"),
    ],
    requestValidationMiddleware,
    getResourcesManagersCount
);

router.get(
    "/:id",
    [param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4")],
    requestValidationMiddleware,
    getResourceManagerById
);

router.put(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    addGroupsToResourcesManagers
);

router.delete(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    removeGroupFromResourcesManager
);

export default router;
