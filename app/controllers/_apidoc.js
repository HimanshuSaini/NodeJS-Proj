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


 /**
 * @api {post} /confirmSubscription Confirm Subscription
 * @apiVersion 0.0.1
 * @apiName Confirm Subscription
 * @apiGroup Subscription
 *
 * @apiParam {String} accessToken Token that is sent in the URL of subscription mail.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK 
 *     {
 *      message: "Successfully subscribed"
 *     }
 *
 * @apiError message Error Message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Email not found in DB
 *     {
 *       message: "You have not put a subscription request yet"
 *     } 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Email not found in request
 *     {
 *       message: "Email not found in request"
 *     }
 */

 /**
 * @api {post} /unsubscribe Unsubscribe from Portal
 * @apiVersion 0.0.1
 * @apiName Unsubscribe
 * @apiGroup Subscription
 *
 * @apiParam {String} accessToken Token that is sent in the unsubscription URL .
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK 
 *     {
 *      message: "Successfully unsubscribed"
 *     }
 *
 * @apiError message Error Message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Could Not find emailID in request
 *     {
 *       message: "You were not subscribed to it"
 *     }
 */

 /**
 * @api {post} /contactUs Sends Feedback
 * @apiVersion 0.0.1
 * @apiName ContactUs
 * @apiGroup Feedback
 *
 * @apiParam {String} name Users Name.
 * @apiParam {String} email Users email ID.
 * @apiParam {String} subject Subject of the mail.
 * @apiParam {String} message Message of the mail.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      message: "Feedback submitted successfull"
 *     }
 *
 * @apiError message Error Message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Already Submitted
 *     {
 *       message: "This feedback from you has already been submitted"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Not Submitted
 *     {
 *       message: "Feedback could not be submitted. Error: {}" 
 *     }
 */