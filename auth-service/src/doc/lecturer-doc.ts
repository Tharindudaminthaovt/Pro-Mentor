/**
 * @swagger
 * components:
 *   schemas:
 *     LecturerCreateRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: email
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           description: last name
 *         contactNumber:
 *           type: string
 *           description: contact number
 *         studentClass:
 *           type: array of string
 *           description: student class
 *         degreeProgram:
 *           type: array of string
 *           description: degree program
 *         school:
 *           type: array of string
 *           description: school
 *       example:
 *         username: lecturer1
 *         email: sample@gmail.com
 *         firstName: john
 *         lastName: ferguson
 *         contactNumber: "1234567890"
 *         studentClass: ["2024", "2025"]
 *         degreeProgram: ["B.Tech", "M.Tech"]
 *         school: ["CSE", "ECE"]
 *
 */

/**
 * @swagger
 * tags:
 *   name: Lecturers
 *   description: Lecturer Management API
 */

/**
 * @swagger
 * paths:
 *
 *   /api/v1/auth/lecturers:
 *     post:
 *       summary: create a new lecturer
 *       description: create a new lecturer
 *       tags: [Lecturers]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LecturerCreateRequest'
 *       responses:
 *         201:
 *           description: lecture created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessMessageResponse'
 *         400:
 *           description: bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/APIException'
 *         401:
 *           description: unauthorized request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/APIException'
 *         409:
 *           description: conflict
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/APIException'
 *         422:
 *           description: validation error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/APIException'
 *         500:
 *           description: internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/APIException'
 *
 */
