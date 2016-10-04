app.factory("plansFactory", ['$http', function($http) {

	function PlansFactory() {

		// [C]RUD - call server to create a new planner
		this.create_planner = function(callback) {
			$http.post("/planner").then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log("[create_planner: ERROR] failed to create a new planner.");
				}
			);
		};

		// C[R]UD - call server to get all the planners from the DB
		this.index_planner = function(callback) {
			$http.get("/planner").then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log("[index_planner: ERROR] failed to retrieve the planners.");
				}
			);
		};

		// CR[U]D - call server to append a 'plan' to the planner
		this.update_planner = function(planner_id, updatePlanner) {
			$http.put("/planner/" + planner_id, updatePlanner).then(
				function success(response) {
					// nothing needs to happen
					// since I will be reloading
				},
				function error(response) {
					console.log("[update_planner: ERROR] failed to append a new plan to the planner.");
				}
			);
		};

		// CRU[D] - call server to delete a specific planner
		this.delete_planner = function(planner_id) {
			$http.delete("/planner/" + planner_id).then(
				function success(response) {
					// nothing happens
				},
				function error(response) {
					console.log("[delete_planner: ERROR] failed to delete the planner.");
				}
			);
		};

		// call server to remove a 'plan' from a planner
		this.delete_single_plan = function(planner_id, plan) {
			$http.patch("/planner/" + planner_id, { plan: plan }).then(
				function success(response) {
					// nothing needs to happen
					// will be reloading
				},
				function error(response) {
					console.log("[delete_single_plan: ERROR] failed to pull a plan from the planner.");
				}
			);
		};

	}

	return new PlansFactory();
}]);
