app.factory("usersFactory", ['$http', function($http) {

	function UsersFactory() {

		this.register = function(newUser, callback) {
			$http.post('/register', newUser).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else {
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log("[register: ERROR] server has failed to register a new user.");
				}
			);
		}

		this.login = function(loginUser, callback) {
			$http.post('/login', loginUser).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else {
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log("[login: ERROR] failed to login an existing user.");
				}
			);
		}

	}

	return new UsersFactory();
}]);
