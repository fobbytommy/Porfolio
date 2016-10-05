var app = angular.module("app", ['ngRoute', 'ngCookies', 'ngFlash']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: "static/partials/home.html"
		})
		.when('/me', {
			templateUrl: "static/partials/me.html",
			controller: 'MeController'
		})
		.when('/resume', {
			templateUrl: "static/partials/resume.html",
			controller: 'MeController'
		})
		.when('/contact', {
			templateUrl: "static/partials/contact.html",
			controller: 'ContactController',
		})
		.when('/skills', {
			templateUrl: "static/partials/skill_storage.html",
			controller: 'SkillStorageController'
		})
		.when('/self', {
			templateUrl: "static/partials/self_qa.html",
			controller: 'SelfController'
		})
		.when('/daily', {
			templateUrl: "static/partials/daily_plan.html",
			controller: 'DailyController'
		})
		.when('/about', {
			templateUrl: "static/partials/about.html",
			controller: 'AboutController'
		})
		.when('/login', {
			templateUrl: "static/partials/login.html",
			controller: "LoginController"
		})
		.when('/dashboard', {
			templateUrl: "static/partials/dashboard.html",
			controller: "DashboardController"
		})
		.otherwise({
			redirectTo: '/home'
		});
}]);
