var mongoose = require('mongoose');
var Planner = mongoose.model('Planner');

function PlannerController() {

	// [C]RUD - create a new planner
	this.create_planner = function(req, res) {
		// create a planner without any data.
		var planner = new Planner({});

		planner.save( function(err, planner) {
			if (err) { // shouldn't get errors...
				console.log("[create_planner: ERROR] failed to create a new planner: ", err);
				// nothing is returned.
			}
			else {
				console.log("[create_planner: SUCCESS] successfully created a new planner!");
				res.json( planner ); // return the created planner
			}
		});
	};

	// C[R]UD - getting all the planners from the DB
	this.index_planner = function(req, res) {
		// find all planners and return them to the factory
		Planner.find({}, function(err, planners) {
			if (err) { // expecting no errors
				 console.log("[index_planner: ERROR] failed to get planners from the DB: ", err);
				// nothing is returned.
			}
			else {
				if (planners == null) { // there are no planners in DB
					console.log("[index_planner: NULL] planner collection is empty.");
					// nothing is returned.
				}
				else {
					console.log("[index_planner: SUCCESS] successfully retrieved all the planners from the DB!");
					res.json( planners ); // return all the planners
				}
			}
		});
	};

	// CR[U]D - append a plan to a specific planner to the DB
	this.update_planner = function(req, res) {
		// find the planner using the id from the parameter
		// then push the object to the array
		Planner.findOneAndUpdate({ _id: req.params.id }, {$push: req.body }, function(err) {
			if (err) { // there shouldn't be
				console.log("[update_planner: ERROR] failed to push a plan to the planner: ", err);
				// return nothing
			}
			else {
				console.log("[update_planner: SUCCESS] successfully updated the planner with a new plan added");
				// return nothing since i will be reloading
			}
		});
	};

	// CRU[D] - delete a planner from the DB
	this.delete_planner = function(req, res) {
		// find using the given id and simply remove
		Planner.remove({ _id: req.params.id }, function(err) {
			if (err) { // there shouldn't be
				console.log("[delete_planner: ERROR] failed to delete a planner from the DB: ", err);
				// return nothing
			}
			else {
				console.log("[delete_planner: SUCCESS] successfully deleted the planner from the DB.");
				// return nothing since i will be reloading
			}
		});
	};

	// pull a single plan from a specific planner
	this.delete_single_plan = function (req, res) {
		// find the planner using the id
		// then use $pull to remove the plan
		Planner.findOneAndUpdate({ _id: req.params.id }, {$pull: req.body }, function(err) {
			if (err) { // there shouldn't be
				console.log("[delete_single_plan: ERROR] failed to pull a plan from the planner: ", err);
				// return nothing
			}
			else {
				console.log("[delete_single_plan: SUCCESS] successfully updated and removed a plan form the planner.");
				// return nothing since i will be reloading
			}
		});
	};

}

module.exports = new PlannerController();
