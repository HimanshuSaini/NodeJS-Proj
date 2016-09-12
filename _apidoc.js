/**
 * @api {post} /subscribe Subscribe to Portal
 * @apiVersion 0.0.1
 * @apiName Subscribe
 * @apiGroup Subscription
 *
 * @apiParam {String} email Users email ID.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK (Sends a mail)
 *     {
 *      message: "Please confirm by clicking on mail that you got"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      message: "You have already subscribed on Date"
 *     }
 *
 * @apiError message Error Message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Could Not Subscribe
 *     {
 *       message: "Email not found in request"
 *     }
 */