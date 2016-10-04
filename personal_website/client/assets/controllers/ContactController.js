app.controller("ContactController", ['$scope', '$location', '$cookies', 'contactsFactory', 'Flash', function($scope, $location, $cookies, contactsFactory, Flash) {
	$scope.login_status = false; // default to display 'logout' button

	// immediate function to check login status
	(function() {
		// if cookie does exist, display 'login' button
		// also save username and authority_level for use
		if ($cookies.get('username') != undefined) {
			$scope.login_status = true;
			$scope.username = $cookies.get('username');
			$scope.authority_level = $cookies.get('authority_level');
		}
	})();

	$scope.send_email = function() {
		contactsFactory.send_email($scope.newMessage, function(status, response) {
			if (status == false) {
				// show flash message for error
				Flash.create('danger', response);
			}
			else {
				$scope.newMessage = {}; // clear the contact form
				// show flash message for confirmation
				$('#send_email_modal').modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				Flash.create('success', response, 4000, {}, true);
			}
		});
	};


	// store user's current page. this is for login and back to current page
	$scope.currentPage = function() {
		$cookies.put("currentPage", "/contact");
	};

	// logout function which removes the cookies and display message
	$scope.logout = function() {
		$cookies.remove("username");
		$cookies.remove("authority_level");
		$scope.username = {}; // clear username variable
		$scope.login_status = false; // login status is now off
		Flash.clear(); // clear flash before putting new flash
		Flash.create("success", "You have successfully logged out!", 4000, {}, true);
	};

}]);
