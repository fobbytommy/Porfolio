app.controller("LoginController", ['$scope', '$location', '$cookies', 'Flash', 'usersFactory', function($scope, $location, $cookies, Flash, usersFactory) {

	// immediate function to check login status
	(function() {
		// if cookie does exist, that user shouldn't be here, since
		// they are already logged in!
		// force them back to 'me' page
		if ($cookies.get('username') != undefined) {
			$scope.username = $cookies.get('username');
			Flash.clear(); // clear flash before putting new flash
			Flash.create("warning", "You are already logged in, <strong>" + $scope.username + "</strong>!", 4000, {}, true);
			// force back to 'me' page with the flash message above
			$location.url('/me');
		}
	})();

	$scope.newUser = {};

	// registration request
	$scope.register = function() {
		usersFactory.register($scope.newUser, function(status, response) {
			if (status == false) {
				Flash.clear();
				// send back error
				var errors = [];
				for (var x in response) {
					errors.push(response[x].message);
				}
				errors.reverse(); // organize order of the errors
				for (var i = 0, j = errors.length; i < j; i++) {
					Flash.create('danger', errors[i]);
				}
			}
			else {
				Flash.clear(); // clear errors
				$scope.newUser = {} // clear register form
				// save username and authority_level in cookies
				$cookies.put("username", response.username);
				$cookies.put("authority_level", response.authority_level);

				// for sake of removing the modal fade
				// instead of reloading
				$('#register_modal').modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();

				// redirect the user to the same page they register from
				$location.url($cookies.get("currentPage"));
				Flash.create("success", "Registration is successful! Welcome, <strong>" + response.username + "</strong>!!!", 4000, {}, true);
			}
		});
	};

	// login request
	$scope.login = function() {
		usersFactory.login($scope.loginUser, function(status, response) {
			if (status == false) { // login failed, send error message
				$scope.loginError = response;
			}
			else {
				$scope.loginError = {}; // clear login error
				$scope.loginUser = {};  // clera user login form
				// save username and authority_level in cookies
				$cookies.put("username", response.username);
				$cookies.put("authority_level", response.authority_level);

				Flash.clear(); // clear flash before putting new flash
				Flash.create("success", "Welcome back, <strong>" + response.username + "</strong>!", 4000, {}, true);
				// redirect the user to the same page they login from
				$location.url($cookies.get("currentPage"));
			}
		});
	};

}]);
