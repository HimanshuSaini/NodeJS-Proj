var ContactUsModel = require('./../models/contact-us-model');
var ErrorHandlingService = require('./../services/error-handling-service');

/**
 * @api {post} /contactUs Sends Feedback
 * @apiVersion 0.0.2
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
 *     HTTP/1.1 401 Not Submitted
 *     {
 *       message: "Feedback could not be submitted. Error: {}" 
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Already Submitted
 *     {
 *       message: "This feedback from you has already been submitted"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Error while finding similar feedback
 *     {
 *       message: "Error while finding similar feedback"
 *     }
 */

exports.contactUs = function (req, res) {
  console.log("Feedback request received");

  var email = req.body.email,
    subject = req.body.subject;

  ContactUsModel.findOne({ email: { $regex: new RegExp(email, "i")},  subject: { $regex: new RegExp(subject, "i")} },
  function(err, doc) { // Using RegEx - search is case insensitive
    console.log("in result");
    if(!err && !doc) {
      var newContactUs = new ContactUsModel();
      newContactUs.email = email;
      newContactUs.subject = subject;
      newContactUs.name = req.body.name;
      newContactUs.message = req.body.message;

      newContactUs.save(function(err) {
        if(!err) {
          res.json(200, {message: "Feedback submitted successfull"});

            //newService.name , csrfToken: req.csrfToken()});
        }
        else {
          ErrorHandlingService.handleError(req, res, err);
          res.status(401).json({message: "Feedback could not be submitted"});
        }
      });
    }
    else if(!err) {
      // same feedback again
      ErrorHandlingService.handleError(req, res, {message: "This feedback from you has already been submitted"});
      res.status(402).json({message: "This feedback from you has already been submitted"});
    }
    else {
      ErrorHandlingService.handleError(req, res, err);
      res.status(405).json({message: "Error while finding similar feedback"});
    }
  });
 

  
}