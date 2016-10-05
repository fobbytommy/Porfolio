var express 	= require('express'),
	bodyParser	= require('body-parser'),
	path 		= require('path'),
	root		= __dirname,
	port 		= process.env.PORT || 8000,
	app			= express();

// use express method called 'static' to set the location of the static files
app.use(express.static(path.join(root, 'client')));

// set to use body-parser's methods
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require mongoose configurations (connectios and models);
require('./server/config/mongoose');
// require routes and invoke it using the 'app' as an argument
require('./server/config/routes')(app);

// listen to the port
app.listen(port, function() {
	console.log(`listening on port ${ port }`);
});
