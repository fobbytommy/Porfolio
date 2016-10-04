var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// question model
var questionSchema = new mongoose.Schema({

	// username will be used to tell which user has wrote the question.
	username: 	{
					type: String
				},
	question: 	{
					type: String,
					required: [true, "Question is required."],
					minlength: [16, "Your question is too short! Please write more than 15 characters!"],
					maxlength: [149, "Your question is too long! Please write less than 150 characters!"]
				},
	// all answer is going to be made by Tommy (unless I change that)
	answer: 	{
					type: String,
					required: [true, "Answer is required."],
					minlength: [6, "Your answer is too short! Please write more than 5 characters!"]
				},

}, { timestamps: true });

mongoose.model('Question', questionSchema);
