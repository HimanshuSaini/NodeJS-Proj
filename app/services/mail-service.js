var nodemailer = require("nodemailer");
var jwt = require('jwt-simple');

exports.createMail = function (email) {
  var mailBody,
    token = jwt.encode({
    email: email
  }, require('../../config/secret')());

  mailBody = "Thank you for showing interest on our website. " + 
    "Please click here to confirm - http://localhost:3000/#/confirmSubscription/" + token;

  return mailBody;
}

exports.sendMail = function (mail, email) {

  console.log("The email is ", email);

//Enter valid credentials in the below code and uncomment it
/*
  var smtpTransporter = nodemailer.createTransport(
    'smtps://<email-id>:<password>@smtp.gmail.com');

  var mailOptions={
    from: "<email-id>",
    to : email,
    subject : "Thanks for subscribing to us",
    text : mail
  };

  smtpTransporter.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      return "error";
    }
    else{
      console.log("Message sent: " + response.message);
      return "sent";
    }
  });
  */
}