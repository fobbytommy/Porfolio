var mongoose = require('mongoose');
var Question = mongoose.model('Question');

function QuestionController() {

	// [C]RUD - create a new question
	this.create_question = function(req, res) {

		var question = new Question({
			username: req.body.username,
			question: req.body.question,
			answer: req.body.answer
		});

		question.save( function(err, question) {
			if (err) { // validation error, send back the error
				console.log("[create_question: ERROR] failed to add a new question to db: ", err);
				res.json({ errors: err.errors });
			}
			else { // question is saved in the db. send back the question
				console.log("[create_question: SUCCESS] successfully created and added a new question to the DB!");
				res.json( question );
			}
		});
	};

	// C[R]UD - get all the questions made by me ('fobbytommy')
	this.index_question = function(req, res) {

		Question.find({ username: 'fobbytommy' }, function(err, questions) {
			if (err) { // just no way this is going to happen...but yeah
				console.log("[index_question: ERROR] failed to get all the questions from db: ", err);
				// nothing is returned.
			}
			else {
				if (questions == null) { // i dont have any questions stored in DB.
					console.log("[index_question: NULL] there are no questions made by 'fobbytommy' from db.");
					// nothing is returned.
				}
				else {
					console.log("[index_question: SUCCESS] successfully retrieved all the questions made by me!");
					res.json( questions );
				}
			}

		});
	};

	// CR[U]D - update a question made by me ('fobbytommy')
	this.update_question = function(req, res) {

		var option = 	{
							runValidators: false, // validate the updating info
							new: false // obtain the updated date after the update is successful
						};

		Question.findOneAndUpdate({ _id: req.params.id }, {$set: req.body }, option, function(err) {
			if (err) {
				console.log("[update_question: ERROR] failed to update a question from the DB: ", err);
				// nothing is returned
			}
			else {
				console.log("[update_question: SUCCESS] successfully updated a question from the DB");
				// nothing is returned
			}

		});
	};


	// CRU[D] - delete a question made by me ('fobbytommy')
	this.delete_question = function(req, res) {

		Question.remove({ _id: req.params.id }, function(err) {
			if (err) {
				console.log("[delete_question: ERROR] failed to delete a question from the DB: ", err);
				// nothing is returned
			}
			else {
				console.log("[delete_question: SUCCESS] successfully deleted a question from the DB!");
				// nothing is returned
			}

		});
	};
	
}

module.exports = new QuestionController();
