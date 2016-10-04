app.controller("DashboardController", ['$scope', '$location', '$cookies', 'Flash', 'usersFactory', function($scope, $location, $cookies, Flash, usersFactory) {
	$scope.login_status = false; // default to display 'logout' button
	$scope.users = [];
	$scope.updateUser = {};

	// immediate function to check login status
	(function() {
		// check if its me going in to this route
		// if not move that user with the warning.
		if ($cookies.get('username') == 'fobbytommy' || $cookies.get('authority_level') == 9) {
			$scope.login_status = true;
			$scope.username = $cookies.get('username');
			$scope.authority_level = $cookies.get('authority_level');
		}
		else { // move user to the currentPage or  me page with a warning
			if ($cookies.get("currentPage") != undefined) {
				$location.url($cookies.get("currentPage"));
			}
			else {
				$location.url("/me");
			}
			Flash.create("danger", "You do not have a permission to access that route!", 4000, {}, true);
		}
	})();

	// Get all users info from the DB
	usersFactory.index_users(function (users) {
		$scope.users = users;
	});

	// Update a user from the DB
	$scope.update_user = function(user_id) {
		usersFactory.update_user(user_id, $scope.updateUser, function(status, response) {
			if (status == false) { // there's validation errors
				$scope.updateErrors = response;
			}
			else { // the update is successful. just reload the page
				location.reload();
			}
		});
	};
	// this will gather the user data before updating
	$scope.get_user_for_update = function(index) {
		$scope.gotUser = $scope.users[index];
		$scope.updateUser.username = $scope.gotUser.username;
		$scope.updateUser.email = $scope.gotUser.email;
		$scope.updateUser.authority_level = $scope.gotUser.authority_level;
	};

	// Delete a user from the DB
	$scope.delete_user = function(delete_id) {
		usersFactory.delete_user(delete_id);
		// then just reload the page
		location.reload();
	};
	$scope.user_delete_id = function (delete_id) {
		$scope.delete_id = delete_id;
	};

	// logout function which removes the cookies and display message
	$scope.logout = function() {
		$cookies.remove("username");
		$cookies.remove("authority_level");
		$scope.username = {}; // clear username variable
		$scope.login_status = false; // login status is now off
		$location.url('/me');
		Flash.clear(); // clear flash before putting new flash
		Flash.create("success", "You have successfully logged out!", 4000, {}, true);
	};
	
}]);
