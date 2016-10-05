app.factory("contactsFactory", ['$http', function($http) {

	function ContactsFactory() {

		// call the server to process the email
		this.send_email = function(newMessage, callback) {

			$http.post('/contact/email', newMessage).then(
				function success(response) {
					// if there is an error key, send the error.
					if (typeof(response.data.error) != 'undefined') {
						callback(false, response.data.error);
					}
					else {
						// else send back the success message
						callback(true, response.data.success);
					}
				},
				function error(response) {
					console.log("[send_email: ERROR] the server has failed to send email to Tommy!");
				}
			);
		};

	}

	return new ContactsFactory();
}]);
