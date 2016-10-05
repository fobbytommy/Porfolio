app.controller('SkillStorageController', ['$scope', '$cookies', 'Flash', function($scope, $cookies, Flash) {
	$scope.login_status = false; // default to display 'logout' button

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

	// CURRENT EQUIPMENTS
	$scope.current = {
		technologies: 	[	"MongoDB",
							"Express",
							"Angular.js",
							"Node.js",
							"Javascript",
							"HTML / HTML5",
							"CSS / CSS3",
							"Twitter Bootstrap",
							"Git / Github & Terminal",
							"AJAX", "APIs",
							"Amazon Web Service (AWS)",
							"Linux Server via AWS",
							"socket.io",
							"npm / bower"
						],
		skills: [	"Full Stack Development (MEAN)",
					"Responsive Web Design",
					"Front-end Development",
					"Wireframes & Mockups",
					"Code Version Control",
					"HTTP Request",
					"Dynamic Content",
					"CRUD Operations",
					"OOP in Javascript",
					"AJAX Requests",
					"MVC Framework / Design",
					"Building Real-time Apps",
					"NoSQL Database Design",
					"RESTful Routing",
					"Web Socket Connection"
				]
	};

	// INVENTORY
	$scope.inventory = {
		technologies: 	[	"LESS",
							"jQuery",
							"jQuery-UI",
							"Python",
							"Flask",
							"Django",
							"MySQL",
							"SQLite",
							"Balsamiq"
						],
		skills:	[	"Full Stack Development (Python)",
					"OOP in Python",
					"SQL Queries",
					"ERD Diagrams",
					"Object Relational Mapper",
					"Relational Database Design",
					"Web Crawler",
					"Test-Driven Development (TDD)",
					"Creating Custom JS libraries"
				]
	};

	// WISHLIST
	$scope.wishlist = {
		technologies: 	[
						],
		skills:	[	"SASS",
					"ReactJS"
				]
	};

	// store user's current page. this is for login and back to current page
	$scope.currentPage = function() {
		$cookies.put("currentPage", "/skills");
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
