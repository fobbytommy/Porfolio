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
	// all answer is going to be made by Tommy
	answer: 	{
					type: String
				},
	// questions can have many comments. (one-to-many relationship)
	_comments: 	[{
		 			type: Schema.Types.ObjectId,
					ref: "Comment"
				}]

}, { timestamps: true });

// comment model
var commentSchema = new mongoose.Schema({
	// a comment can only belong to a one specific question
	_question: 	{
					type: Schema.Types.ObjectId,
					ref: "Question"
				},
	username: 	{
					type: String
				},
	comment: 	{
					type: String,
					required: [true, "Please write something before you add a comment!"],
					minlength: [9, "Your comment is too short! Please write more than 8 characters!"],
					maxlength: [499, "Your comment is too long! Please write less than 500 characters!"]
				}

}, { timestamps: true});

mongoose.model('Question', questionSchema);
mongoose.model('Comment', commentSchema);
