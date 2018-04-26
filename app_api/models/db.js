var mongoose = require('mongoose');
var readline = require('readline');

var dbURI = 'mongodb://localhost/loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to '+dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Error connecting to '+dbURI+ ' and error is '+err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected from '+dbURI);
});

if(process.platform === "win32"){
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on ("SIGINT", function(){
		process.emit("SIGINT");
	});
}

var gracefulShutdown = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('Graceful Shutdown through '+msg);
		callback();
	})
};

// For nodeman restarts
process.on('SIGUSR2', function() {
	gracefulShutdown('nodeman restart', function(){
		process.kill(process.pid, 'SIGUSR2');
	})
});

//For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function(){
		process.exit(0);
	})
});


// For Heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function(){
		process.exit(0);
	})
});


// BRING IN YOUR SCHEMAS & MODELS
require('./locations');