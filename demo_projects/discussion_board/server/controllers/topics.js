var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

function TopicController() {

	// controls retrieving all the topics for the dashboard page
	this.index = function(req, res) {
		Topic.find({}, function(err, topics) {
			if (err) {
				console.log("[index(topics): ERROR] could not retrieve the topics form the DB: ", err);
			}
			else { // even if the topics is null (empty), send it. shouldn't matter.
				res.json( topics );
			}
		});
	}

	// controls the creation of a new topic
	this.create_topic = function(req, res) {
		var topic = new Topic( req.body );

		topic.save( function(err, topic) {
			if (err) { // validation errors. send back the errors
				console.log("[create_topic: ERROR] could not create a new topic: ", err);
				res.json({ errors: err.errors });
			}
			else { // new topic is successfully created and stored into the DB!
				console.log("[create_topic: SUCCESS] successfully created a new topic!");
				// set post count to 0 before send
				topic.post_count = 0;
				res.json( topic ); // return the topic object back to the calling factory
			}
		});
	}

	// controls the retrieval of a single topic based on given _id
	this.single_topic = function(req, res) {

		Topic.findOne({ _id: req.params.id }, function(err, topic) {
			if (topic == null) { // if null, there is no topic associated with the _id.
				console.log("[single_topic: ERROR] failed to retrieve a topic from the DB!");
				res.json({errors: "The topic for the id was not found"});
			}
			else {
				console.log("[single_topic: SUCCESS] successfully retrieved a topic from the DB!");
				res.json(topic);
			}
		});
	}

	// controls the updating a single topic based on given _id
	this.update_topic = function(req, res) {
		var option = 	{
							runValidators: true, // validate the updating info
							new: true // obtain the updated date after the update is successful
						};

		Topic.findOneAndUpdate({ _id: req.params.id }, {$set: req.body }, option, function(err, topic) {
			if (err) { // updated topic does not meet the validation requirement
				console.log("[update_topic: ERROR] failed to update a topic from the DB: ", err);
				res.json({ errors: err.errors });
			}
			else {
				console.log("[update_topic: SUCCESS] successfully updated a topic from the DB");
				res.json( topic );
			}
		});
	}

	// controls the deletion of a single topic based on given _id
	this.delete_topic = function(req, res) {
		// delete the topic from the database
		Topic.remove({ _id: req.params.id }, function(err) {
			if (err) {
				console.log("[delete_topic: ERROR] failed to delete a topic from the DB: ", err);
				// nothing is returned
			}
			else {
				console.log("[delete_topic: SUCCESS] successfully deleted a topic from the DB");
				// nothing is returned
			}
		});

		// delete the posts and comments associated with this topic
		Post.find({ topic_id: req.params.id }, function(err, posts) {
			if (err) {
				console.log("[delete_topic: ERROR] failed to find posts from the DB: ", err);
			}
			else {
				for (var i in posts) {
					// remove all the comments associated with the removed topic's posts
					Comment.remove({ _post: posts[i]._id }, function(err) {
						if (err) {
							console.log("[delete_topic: ERROR] failed to delete comments associated with the removed topic's posts from the DB: ", err);
						}
						else {
							console.log("[delete_topic: SUCCESS] successfully removed all the comments associated with the removed topic's posts from the DB");
						}
					});
				}
				// remove all the posts associated with the removed topic
				Post.remove({ topic_id: req.params.id }, function(err) {
					if (err) {
						console.log("[delete_topic: ERROR] failed to delete posts associated with the removed topic from the DB: ", err);
					}
					else {
						console.log("[delete_topic: SUCCESS] successfully removed all the posts associated with the removed topic from the DB");
					}
				});
			}
		});


	}

}

module.exports = new TopicController();
