// require all the controllers
var contacts = require("./../controllers/contacts");
var users = require("./../controllers/users");
var questions = require("./../controllers/questions");
var planners = require("./../controllers/planners");

module.exports = function(app) {

	// deals with http requests from the 'Contact' page
	app.post("/contact/email", contacts.send_email); // for sending a email to me

	// deals with http requests from the 'Login' page
	app.post("/register", users.register); // register process with validation
	app.post("/login", users.login); // login process to check email & password

	// [RESTful] deals with http requests from the 'Self Q & A' page
	app.post("/question", questions.create_question);
	app.get("/question", questions.index_question);
	app.put("/question/:id", questions.update_question);
	app.delete("/question/:id", questions.delete_question);

	// [RESTful] deals with http requests from the 'Daily Plan' page
	app.post("/planner", planners.create_planner);
	app.get("/planner", planners.index_planner);
	app.put("/planner/:id", planners.update_planner);
	app.patch("/planner/:id", planners.delete_single_plan);
	app.delete("/planner/:id", planners.delete_planner);

	// deals with http requests from the 'Dashboard' page
	app.get("/users", users.index_users);
	app.put("/users/:id", users.update_user);
	app.delete("/users/:id", users.delete_user);

}
