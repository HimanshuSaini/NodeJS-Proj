
/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Location schema
 */

var SubscriptionSchema = new Schema({
  email: { type: String, default: '' },
  subscribed: { type: Boolean, default: true},
  subscriptionDate: { type: Date, default: Date.now},
  unsubscriptionDate: { type: Date, default: ''},
  confirmed: { type: Boolean, default: false}
});


//mongoose.model(name, [schema], [collection], [skipInit])

module.exports = mongoose.model('subscription', SubscriptionSchema, 'subscription');