var contacts = require("./../controllers/contacts");

module.exports = function(app) {

	// deals with http requests from the contact page
	app.post("/contact/email", contacts.send_email);


}
