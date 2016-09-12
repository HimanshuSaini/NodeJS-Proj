var SubscriptionModel = require('./../models/subscription-model');
var MailService = require('./../services/mail-service');
var ErrorHandlingService = require('./../services/error-handling-service');
var jwt = require('jwt-simple');

/**
 * @api {post} /subscribe Subscribe to Portal
 * @apiVersion 0.0.2
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
 *     HTTP/1.1 401 Error while searching for email in DB
 *     {
 *       message: "Bad Request"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Error while saving email in DB
 *     {
 *       message: "Error while saving emailID"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Could Not Subscribe
 *     {
 *       message: "Email not found in request"
 *     }
 */

exports.subscribe = function (req, res) {
  console.log("Subscribe request received");

  var email = req.body.email;

  if(email) {
    console.log("Email found in request:" + email);

    SubscriptionModel.findOne({ email: email },
      function (err, subscription) {
      if (err) {
        ErrorHandlingService.handleError(req, res, err);
        res.status(401).json({message: "Bad Request"});
      }
      if(subscription) {
        res.status(201).send({message:"You have already subscribed on " + subscription.subscriptionDate});
      }
      else {
       var newSubscription = new SubscriptionModel();
        newSubscription.email = email;

        newSubscription.save(function (err) {
          if (err) {
            ErrorHandlingService.handleError(req, res, err);
            res.status(402).json({message: "Error while saving emailID"});
          }

          var mail = MailService.createMail(email);
          var status = MailService.sendMail(mail, email);

          res.status(200).send({message: "Please confirm by clicking on mail that you got"});
        });
      }
    });
  } 
  else {
    ErrorHandlingService.handleError(req, res, {message: "Email not found in request"});
    res.status(405).json({message: "Email not found in request"});
  }
};

/**
 * @api {post} /confirmSubscription Confirm Subscription
 * @apiVersion 0.0.2
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
 *     HTTP/1.1 401 Error in finding the email in request
 *     {
 *       message: "Bad Request"
 *     } 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Could not confirm the subscription
 *     {
 *       message: "Error while confirming the subscription"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Could not find email in DB
 *     {
 *       message: "You have not put a subscription request yet"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Email not found in request
 *     {
 *       message: "Email not found in request"
 *     }
 */


exports.confirmSubscription = function (req, res) {
  console.log("Confirm subscription request received");

  var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];
  var decoded = jwt.decode(token, require('../../config/secret')());

  if(decoded.email) {
    console.log("Email found in request:" + decoded.email);

    SubscriptionModel.findOne({ email: { $regex: new RegExp(decoded.email, "i") } },
    function(err, subscription) { // Using RegEx - search is case insensitive
      console.log("in result");
      if (err) {
          ErrorHandlingService.handleError(req, res, err);
          res.status(401).json({message: "Bad Request"});
        }
        if(subscription) {
          SubscriptionModel.findByIdAndUpdate(subscription._id, {confirmed: true}, function (err){
            if (err) {
              ErrorHandlingService.handleError(req, res, err);
              res.status(402).json({message: "Error while confirming the subscription"});
            }
            res.status(200).send({ message:"Successfully subscribed."});
          });
        }
        else {
          ErrorHandlingService.handleError(req, res);
          res.status(403).send({ message: "You have not put a subscription request yet"});
        }
      });
  } 
  else {
    console.log("Email not found in request:" + decoded.email);
    ErrorHandlingService.handleError(req, res);
    res.json(405, { message: "Email not found in request:"});
  }
};

/**
 * @api {post} /unsubscribe Unsubscribe from Portal
 * @apiVersion 0.0.2
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
 *     HTTP/1.1 401 Error while searching emailID in DB
 *     {
 *       message: "Bad Request"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Error while unsubscribing
 *     {
 *       message: "Error while unsubscribing"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 405 Could Not find emailID in request
 *     {
 *       message: "You were not subscribed to it"
 *     }
 */

exports.unsubscribe = function(req, res) {

  var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];
  var decoded = jwt.decode(token, require('../../config/secret.js')());

  if (decoded.email) {
    SubscriptionModel.findOne({email: decoded.email},function (err, subscription) {
      if (err) {
        ErrorHandlingService.handleError(req, res, err);
        res.status(401).json({message: "Bad Request"});
      }
      if(subscription) {
        SubscriptionModel.findByIdAndUpdate(subscription._id, {subscribed: false, unsubscriptionDate: new Date().toISOString()}, 
          function (err){
          if (err) {
            ErrorHandlingService.handleError(req, res, err);
            res.status(402).json({message: "Error while unsubscribing"});
          }
          res.status(200).send({message: "Successfully unsubscribed."});
        });
      }
      else {
        ErrorHandlingService.handleError(req, res);
        res.status(405).send({message: "You were not subscribed to it"});
      }
    });
  }
};


//Private Methods - Need to move to a common service

