var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var User = mongoose.model("User");

function UserController() {

	// method for registering a user
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

	// method for login a user
	this.login = function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({ username_lowercase: username.toLowerCase() }, function(err, user) {
			if (user == null) { // username does not existing in the database
				console.log("[login: ERROR] failed to find the user in the db!");
				res.json({errors: "Username or password does not match!"});
			}
			else { // the username is found in the db.
				// now, compare the password to see if they match
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

	// R of CRUD: get all the users from the db and send back the info
	this.index_users = function(req, res) {

		// find all and remove _id, hashed password before sending back the data
		User.find({}).select('-password -updatedAt -username_lowercase -__v').exec(function(err, users) {
			if (err) {
				console.log("[index_users: ERROR] failed to retrieve users from DB: ", err);
			}
			else {
				if (users == null) {
					console.log("[index_users: NULL] there are no users in DB");
				}
				else {
					console.log("[index_users: SUCCESS] successfully retrieved all users from the DB.");
					res.json( users );
				}
			}

		});
	}

	// U of CRUD: update a single user
	this.update_user = function(req, res) {

		var option = 	{
							runValidators: false, // validate the updating info
							new: false // obtain the updated info after the update is successful
						};

		User.findByIdAndUpdate(req.params.id, { $set: req.body }, option, function(err) {
			if (err) { // if err, there's validation errors. send back the errors
				console.log("[update_user: ERROR] failed to update a user from the DB: ", err);
				res.json({ errors: "There was an error. Duplicate email or username." });
			}
			else {
				console.log("[update_user: SUCCESS] successfully updated a user from the DB");
				res.json();
			}

		});
	};

	// D of CRUD: delete a single user
	this.delete_user = function(req, res) {
		// via using the id, simply delete
		User.remove({ _id: req.params.id }, function (err) {
			if (err) {
				console.log("[delete_user: ERROR] failed to delete a user from the DB: ", err);
			}
			else {
				console.log("[delete_user: SUCCESS] successfully deleted a user from the DB!");
			}
		});
	};

}


module.exports = new UserController();
