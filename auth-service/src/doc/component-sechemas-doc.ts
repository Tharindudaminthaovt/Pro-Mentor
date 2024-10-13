/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessMessageResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: message of the response
 *       example:
 *         message: user created successfully
 *
 *     SimpleGroupResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: group id
 *         name:
 *           type: string
 *           description: group name
 *         path:
 *           type: string
 *           description: group path
 *
 *     ErrorMessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message of the response
 *
 *     APIException:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessageResponse'
 *         errorCode:
 *           type: string
 *           description: error code of the response
 *
 */
