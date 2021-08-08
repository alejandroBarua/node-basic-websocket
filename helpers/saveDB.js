const path = require('path');
const fs = require('fs');

const pathDB = path.join(__dirname, '../database/data.json');

const saveData = data => fs.writeFileSync(pathDB, JSON.stringify(data));

const readData = () => {

	if(!fs.existsSync(pathDB)) return {};
	const data = fs.readFileSync(pathDB);
	return JSON.parse(data);
}

module.exports = {
	saveData,
	readData,

};