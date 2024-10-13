import { Router } from "express";
import { body, param, query } from "express-validator";
import { requestValidationMiddleware } from "@promentor-app/shared-lib";

import {
    addGroupsToLecturer,
    createLecturer,
    getLectureById,
    getLecturers,
    getLecturersCount,
    removeGroupFromLecturer,
    updateLecturer,
} from "../controllers/lecturer-controller";

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
        body("studentClass").trim().optional().isArray().withMessage("Should be a array"),
        body("degreeProgram").trim().optional().isArray().withMessage("Should be a array"),
        body("school").trim().optional().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    createLecturer
);

router.patch(
    "/:id",
    [
        param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4"),
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
    updateLecturer
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
    getLecturers
);

router.get(
    "/count",
    [
        query("groups").trim(),
        query("active").trim().optional().isBoolean().withMessage("Should be a boolean"),
        query("search").trim().optional().isString().withMessage("Should be a string"),
    ],
    requestValidationMiddleware,
    getLecturersCount
);

router.get(
    "/:id",
    [param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4")],
    requestValidationMiddleware,
    getLectureById
);

router.put(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    addGroupsToLecturer
);

router.delete(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("lecturer Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    removeGroupFromLecturer
);

export default router;
