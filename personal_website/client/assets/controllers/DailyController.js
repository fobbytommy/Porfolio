app.controller("DailyController", ['$scope', '$location', '$cookies', 'Flash', 'plansFactory', function($scope, $location, $cookies, Flash, plansFactory) {
	$scope.login_status = false; // default to display 'logout' button
	$scope.planners = [];
	$scope.updatePlanner = {};

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

	// Create a 'planner' for me to add plans on
	$scope.create_planner = function() {
		plansFactory.create_planner(function(planner) {
			$scope.planners.push(planner);
		});
	};

	// Index: request to get all the planners
	plansFactory.index_planner(function(planners) {
		$scope.planners = planners;
	});


	// Update a 'planner' to append a plan
	$scope.update_planner = function(planner_id) {
		plansFactory.update_planner(planner_id, $scope.updatePlanner);
		location.reload();
	};

	// Delete a 'planner' from the db
	$scope.delete_planner = function(planner_id) {
		plansFactory.delete_planner(planner_id);
		location.reload();
	};

	// Delete (patch) a SINGLE 'plan' from a specific planner
	$scope.delete_single_plan = function(planner_id, plan) {
		plansFactory.delete_single_plan(planner_id, plan);
		location.reload();
	};


	// store user's current page. this is for login and back to current page
	$scope.currentPage = function() {
		$cookies.put("currentPage", "/daily");
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
