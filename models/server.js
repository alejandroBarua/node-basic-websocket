const express = require('express');
const cors = require('cors');
const socketController = require('../socket/controller');

class Server {
	
	constructor(){
		this.app = express();
		this.port = process.env.PORT;

		this.server = require('http').createServer(this.app);
		this.io = require('socket.io')(this.server);
		this.sockets();
		
		//this.routeUser = '/api/user';

		// middlewares
		this.middlewares();

		this.routes();
	}

	middlewares(){

		// cors
		this.app.use(cors());

		this.app.use(express.static('public'));
	}

	routes(){
		//this.app.use(this.routeUser, require('../routes/user'));
	}

	sockets(){

		this.io.on('connection', socketController);

	}
	
	listen(){

		this.server.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		})
	}
}

module.exports = Server;