
/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Location schema
 */

var ContactUsSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  subject: { type: String, default: '' },
  mailDate: { type: Date, default: Date.now},
  message: { type: String, default: ''}
});


//mongoose.model(name, [schema], [collection], [skipInit])

module.exports = mongoose.model('contactUs', ContactUsSchema, 'contactUs');