app.controller("ContactController", ['$scope', '$location', '$cookies', 'contactsFactory', 'Flash', function($scope, $location, $cookies, contactsFactory, Flash) {

	$scope.send_email = function() {
		contactsFactory.send_email($scope.newMessage, function(status, response) {
			if (status == false) {
				// show flash message for error
				Flash.create('danger', response);
			}
			else {
				$scope.newMessage = {}; // clear the contact form
				// show flash message for confirmation
				Flash.create('success', response);
			}
		});
	}

}]);
