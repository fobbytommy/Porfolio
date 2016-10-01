var bcrypt = require("bcrypt");
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
	};


	this.login = function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({ username_lowercase: username.toLowerCase() }, function(err, user) {
			if (user == null) { // username does not existing in the database
				console.log("[login: ERROR] failed to find the user in the db!");
				res.json({errors: "Username or password does not match!"});
			}
			else {
				if (bcrypt.compareSync(password, user.password) == false) {
					console.log("[login: ERROR] password does not match!");
					res.json({errors: "Username or password does not match!"});
				}
				else {
					console.log("[login: SUCCESS] successfully login a user!");
					res.json( user );
				}
			}
		});



	};

}


module.exports = new UserController();
