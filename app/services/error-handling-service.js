exports.handleError = function (req, res, err) {
	console.log("The request was " + req.url);
	console.log("The response was " + res);
	console.log("The error was " + err);
};