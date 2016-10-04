app.factory("usersFactory", ['$http', function($http) {

	function UsersFactory() {

		// call the server to process the registration process
		this.register = function(newUser, callback) {
			$http.post('/register', newUser).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						// send back the validation errors
						callback(false, response.data.errors);
					}
					else {
						// registration is successful!
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log("[register: ERROR] server has failed to register a new user.");
				}
			);
		};

		// call the server to process the login
		this.login = function(loginUser, callback) {
			$http.post('/login', loginUser).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						// did not meet the email or password. send back the error message
						callback(false, response.data.errors);
					}
					else {
						// login is successful!
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log("[login: ERROR] failed to login an existing user.");
				}
			);
		};


		// call the server to get all the users data from DB
		this.index_users = function(callback) {
			$http.get("/users").then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log("[index_users: ERROR] failed to get users info from DB.");
				}
			);
		};

		// call the server to update a specific user from the DB
		this.update_user = function(user_id, updateUser, callback) {
			updateUser.username_lowercase = updateUser.username.toLowerCase();
			$http.put("/users/" + user_id, updateUser).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else {
						callback(true);
					}
				},
				function error(response) {
					console.log("[update_user: ERROR] failed to update user's info from DB.");
				}
			);
		};

		// call the server to delete a specific user from the DB
		this.delete_user = function(delete_id) {
			$http.delete("/users/" + delete_id).then(
				function success(response) {
					// nothing needs to happen
				},
				function error(response) {
					console.log("[delete_user: ERROR] failed to delete a user from DB.");
				}
			);
		};

	}

	return new UsersFactory();
}]);
