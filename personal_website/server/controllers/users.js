var mongoose = require("mongoose");
var User = mongoose.model("User");

function UserController() {

	this.register = function(req, res) {
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var user;

		if (username == 'fobbytommy') { // should delete this after I register
			user = new User({
				email: email,
				username: username,
				username_lowercase: username,
				password: password,
				authority_level: 9
			});
		}
		else {
			user = new User({
				email: email,
				username: username,
				username_lowercase: username,
				password: password,
			});
		}

		user.save( function(err, user) {
			if (err) {
				console.log("[register: ERROR] failed to register a new user: ", err);
				res.json({ errors: err.errors });
			}
			else {
				console.log("[register: SUCCES] successfully registered a new user!");
				res.json( user );
			}
		});


	}

}


module.exports = new UserController();
