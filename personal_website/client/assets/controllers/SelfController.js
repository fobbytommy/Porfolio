app.controller("SelfController", ['$scope', '$location', '$cookies', 'Flash', 'questionsFactory', function($scope, $location, $cookies, Flash, questionsFactory) {
	$scope.login_status = false; // default to display 'logout' button
	$scope.newQuestion = {};
	$scope.updateQuestion = {};
	$scope.questions = [];

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

	// create a new question
	$scope.create_question = function() {
		questionsFactory.create_question($scope.newQuestion, $scope.username, function(status, response) {
			if (status == false) {
				// display validation errors
				$scope.questionErrors = response;
			}
			else {
				$scope.questionErrors = {}; // clear form errors
				$scope.newQuestion = {}; // clear question form
				// push question to the $scope.questions
				$scope.questions.push(response);
				Flash.create("success", "Successfully added a new question!", 4000, {}, true);
			}
		});
	};

	// get all the questions made by 'fobbytommy' (by me)
	questionsFactory.index_question(function(questions) {
		$scope.questions = questions;
	})


	// Update a question
	$scope.update_question = function(question_id) {
		questionsFactory.update_question(question_id, $scope.updateQuestion);
		// then just reload the page
		location.reload();
	};
	// get the question before update to show the current data
	$scope.get_question_for_update = function(index) {
		$scope.gotQuestion = $scope.questions[$scope.questions.length - 1 - index];
		$scope.updateQuestion.question = $scope.gotQuestion.question;
		$scope.updateQuestion.answer = $scope.gotQuestion.answer;
	};

	// Delete a question
	$scope.delete_question = function(delete_id) {
		questionsFactory.delete_question(delete_id);
		// then just reload the page
		location.reload();
	};
	$scope.save_delete_id = function (delete_id) {
		$scope.delete_id = delete_id;
	};

	// store user's current page. this is for login and back to current page
	$scope.currentPage = function() {
		$cookies.put("currentPage", "/self");
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
