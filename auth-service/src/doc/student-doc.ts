/**
 * @swagger
 * components:
 *   schemas:
 *     StudentCreateRequest:
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
 *         username: student1
 *         email: sample@gmail.com
 *         firstName: john
 *         lastName: ferguson
 *         contactNumber: "1234567890"
 *         studentClass: ["2024", "2025"]
 *         degreeProgram: ["B.Tech", "M.Tech"]
 *         school: ["CSE", "ECE"]
 *
 *     GetStudentCountResponse:
 *       type: object
 *       required:
 *         - count
 *       properties:
 *         count:
 *           type: integer
 *           description: count
 *       example:
 *         count: 1
 *
 *     StudentUpdateRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           description: last name
 *         enabled:
 *           type: boolean
 *           description: enabled
 *         contactNumber:
 *           type: string
 *           description: contact number
 *       example:
 *         email: example@gmail.com
 *         firstName: john
 *         lastName: ferguson
 *         enabled: true
 *         contactNumber: "1234567890"
 *
 *     StudentGetResponse:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - enabled
 *         - emailVerified
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: student id
 *           format: uuid
 *         username:
 *           type: string
 *           description: username
 *         enabled:
 *           type: boolean
 *           description: enabled
 *         emailVerified:
 *           type: boolean
 *           description: email verified
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           description: last name
 *         email:
 *           type: string
 *           description: email
 *
 *     StudentGetByIdResponse:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - enabled
 *         - emailVerified
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: student id
 *         createdTimestamp:
 *           type: string
 *           description: created timestamp
 *         username:
 *           type: string
 *           description: username
 *         enabled:
 *           type: boolean
 *           description: enabled
 *         emailVerified:
 *           type: boolean
 *           description: email verified
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           description: last name
 *         email:
 *           type: string
 *           description: email
 *         contactNumber:
 *           type: string
 *           description: contact number
 *         profileUrl:
 *           type: string
 *           description: profile url
 *         groups:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SimpleGroupResponse'
 *           description: groups
 *
 *     AddGroupToStudentRequest:
 *       type: object
 *       required:
 *         - groups
 *       properties:
 *         groups:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: group id
 *
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student Management API
 */

/**
 * @swagger
 * paths:
 *
 *   /api/v1/auth/students:
 *
 *     get:
 *       summary: Get all students
 *       description: Retrieve a list of students
 *       tags: [Students]
 *       parameters:
 *         - name: groups
 *           in: query
 *           required: true
 *           description: groups
 *           schema:
 *             type: array
 *             minItems: 1
 *             collectionFormat: multi
 *             items:
 *               type: string
 *               format: uuid
 *         - name: active
 *           in: query
 *           required: false
 *           description: active
 *           schema:
 *             type: boolean
 *             description: active
 *         - name: search
 *           in: query
 *           required: false
 *           description: search
 *           schema:
 *             type: string
 *             description: search
 *         - name: limit
 *           in: query
 *           required: false
 *           description: limit
 *           schema:
 *             type: integer
 *             description: limit
 *         - name: offset
 *           in: query
 *           required: false
 *           description: offset
 *           schema:
 *             type: integer
 *             description: offset
 *       responses:
 *         200:
 *           description: A single student object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/StudentGetResponse'
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
 *         404:
 *           description: student not found
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
 *
 *     post:
 *       summary: create a new student
 *       description: create a new student
 *       tags: [Students]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentCreateRequest'
 *       responses:
 *         201:
 *           description: student created successfully
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
 *   /api/v1/auth/students/count:
 *
 *     get:
 *       summary: Get student count
 *       description: Retrieve a list of students count
 *       tags: [Students]
 *       parameters:
 *         - name: groups
 *           in: query
 *           required: true
 *           description: groups
 *           schema:
 *             type: array
 *             minItems: 1
 *             collectionFormat: multi
 *             items:
 *               type: string
 *               format: uuid
 *         - name: active
 *           in: query
 *           required: false
 *           description: active
 *           schema:
 *             type: boolean
 *             description: active
 *         - name: search
 *           in: query
 *           required: false
 *           description: search
 *           schema:
 *             type: string
 *             description: search
 *       responses:
 *         200:
 *           description: A single student object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetStudentCountResponse'
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
 *         404:
 *           description: student not found
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
 *   /api/v1/auth/students/{userId}:
 *     get:
 *       summary: Get student by ID
 *       description: Retrieve a student by their ID
 *       tags: [Students]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: Student ID
 *           schema:
 *             type: string
 *             format: uuid
 *       responses:
 *         200:
 *           description: A single student object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/StudentGetByIdResponse'
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
 *         404:
 *           description: student not found
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
 *     patch:
 *       summary: update student by ID
 *       description: update a student by their ID
 *       tags: [Students]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: Student ID
 *           schema:
 *             type: string
 *             format: uuid
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentUpdateRequest'
 *       responses:
 *         200:
 *           description: A single student object
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
 *         404:
 *           description: student not found
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
 *   /api/v1/auth/students/{userId}/groups:
 *
 *     put:
 *       summary: add groups to student
 *       description: add groups to student
 *       tags: [Students]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: Student ID
 *           schema:
 *             type: string
 *             format: uuid
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddGroupToStudentRequest'
 *       responses:
 *         200:
 *           description: A success response
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
 *         404:
 *           description: student not found
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
 *     delete:
 *       summary: remove groups to student
 *       description: remove groups to student
 *       tags: [Students]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: Student ID
 *           schema:
 *             type: string
 *             format: uuid
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddGroupToStudentRequest'
 *       responses:
 *         200:
 *           description: A success response
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
 *         404:
 *           description: student not found
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
 *
 */
