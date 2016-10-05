app.factory("questionsFactory", ['$http', function($http) {

	function QuestionsFactory() {

		// [C]RUD - Create question
		this.create_question = function(newQuestion, username, callback) {
			newQuestion.username = username;
			$http.post('/question', newQuestion).then(
				function success(response) {
					if(typeof(response.data.errors) != 'undefined') {
						// send back the validation errors to the controller to be displayed
						callback(false, response.data.errors);
					}
					else {
						callback(true, response.data); // send back the Q&A to the controller
					}
				},
				function error(response) {
					console.log("[create_question: ERROR] failed to create a new question!");
				}
			);
		};

		// C[R]UD - get all the questions made by me (username: 'fobbytommy')
		this.index_question = function(callback) {
			$http.get('/question').then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log("[index_question: ERROR] failed to get all the questions from DB!");
				}
			);
		};

		// CR[U]D - update a question from the Self Q & A
		this.update_question = function(question_id, updateQuestion) {
			$http.put('/question/' + question_id, updateQuestion).then(
				function success(response) {
					console.log("[update_question: SUCCESS] successfully updated a question from the DB!");
				},
				function error(response) {
					console.log("[update_question: ERROR] failed to update a question from DB!");
				}
			);
		};

		// CRU[D] - delete a question from the Self Q & A
		this.delete_question = function(delete_id) {
			$http.delete('/question/' + delete_id).then(
				function success(response) {
					console.log("[delete_question: SUCCESS] successfully deleted a question from the DB!");
				},
				function error(response) {
					console.log("[delete_question: ERROR] failed to delete a question from DB!");
				}
			);
		};

	}

	return new QuestionsFactory();
}]);
