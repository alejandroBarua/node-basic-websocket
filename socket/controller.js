const {
	saveData,
	readData,
} = require('../helpers/saveDB');

const socketController = (socket) => {

	let { online } = readData();
	online++;
	saveData({online});
	
	socket.emit('connect-user', {online});
	socket.broadcast.emit('connect-user', {online});

	
	socket.on('disconnect', () => {
		let { online } = readData();
		online--;
		saveData({online});
		socket.broadcast.emit('disconnect-user', {online});
	})

	socket.on('send-message', ({username, message}) => {
		socket.emit('send-message', {username, message});
		socket.broadcast.emit('send-message', {username, message});
	})
	
	


}

module.exports = socketController;