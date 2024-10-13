import { Router } from "express";
import { body, param, query } from "express-validator";
import { requestValidationMiddleware } from "@promentor-app/shared-lib";

import {
    addGroupsToStudent,
    createStudent,
    getStudentById,
    getStudents,
    getStudentsCount,
    removeGroupFromUser,
    updateStudent,
} from "../controllers/student-controller";

const router = Router();

router.post(
    "/",
    [
        body("username").trim().isString().notEmpty().withMessage("username is required"),
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
        body("contactNumber").trim().optional(),
        body("studentClass").trim().optional().isArray().withMessage("Should be a array"),
        body("degreeProgram").trim().optional().isArray().withMessage("Should be a array"),
        body("school").trim().optional().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    createStudent
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
    getStudents
);

router.get(
    "/count",
    [
        query("groups").trim(),
        query("active").trim().optional().isBoolean().withMessage("Should be a boolean"),
        query("search").trim().optional().isString().withMessage("Should be a string"),
    ],
    requestValidationMiddleware,
    getStudentsCount
);

router.get(
    "/:id",
    [param("id").trim().isUUID(4).withMessage("student Id should be a valid uuid v4")],
    requestValidationMiddleware,
    getStudentById
);

router.patch(
    "/:id",
    [
        param("id").trim().isUUID(4).withMessage("student Id should be a valid uuid v4"),
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
    updateStudent
);

router.put(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("student Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    addGroupsToStudent
);

router.delete(
    "/:id/groups",
    [
        param("id").trim().isUUID(4).withMessage("student Id should be a valid uuid v4"),
        body("groups").trim().isArray().withMessage("Should be a array"),
    ],
    requestValidationMiddleware,
    removeGroupFromUser
);

export default router;
