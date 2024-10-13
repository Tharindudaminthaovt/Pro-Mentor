/**
 * @swagger
 * components:
 *   schemas:
 *     AuthTokenRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         username: student1
 *         password: password
 *     AuthTokenResponse:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           description: access token
 *       example:
 *         access_token: eyJ**************J9
 */

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test Endpoint for development
 */

/**
 * @swagger
 * /api/v1/auth/test/get-access-token:
 *   post:
 *     summary: get access token for the user
 *     description: get access token for the user
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthTokenRequest'
 *     responses:
 *       200:
 *         description: access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokenResponse'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       401:
 *         description: unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       422:
 *         description: unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIException'
 */
