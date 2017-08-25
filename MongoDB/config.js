const mongoose = require('mongoose');


(() => {

	const dbURL = 'mongodb://localhost/aula-mongo';
	mongoose.connect(dbURL)

	mongoose.connection.on('connected', () => console.log('Mongoose default open to ' + dbURL));
	mongoose.connection.on('error', err => console.log(`Mongoose default connection error : ${err}`));
	mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
	mongoose.connection.on('open', () => console.log('Mongoose default connection is open'))

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Mongoose default connection disconnected through app termination.');
			process.exit(0); 
		});
	})

})()