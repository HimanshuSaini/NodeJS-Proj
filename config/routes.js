
/**
 * Module dependencies.
 */

var SubscriptionCtrl = require('./../app/controllers/subscription-ctrl');
var ContactUsCtrl = require('./../app/controllers/contact-us-ctrl');
var ErrorHandlingService = require('./../app/services/error-handling-service');


/**
 * Expose
 */

module.exports = function (app) {

  app.post('/subscribe', SubscriptionCtrl.subscribe);
  app.post('/confirmSubscription', SubscriptionCtrl.confirmSubscription);
  app.post('/unsubscribe', SubscriptionCtrl.unsubscribe);

  app.post('/contactUs', ContactUsCtrl.contactUs);


  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 500
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    ErrorHandlingService.handleError(req, res, err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });

};
