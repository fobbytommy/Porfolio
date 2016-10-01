var contacts = require("./../controllers/contacts");
var users = require("./../controllers/users");

module.exports = function(app) {

	// deals with http requests from the 'Contact' page
	app.post("/contact/email", contacts.send_email); // for sending a email to me

	// deals with http requests from the 'Login' page
	app.post("/register", users.register);
	app.post("/login", users.login);

}
