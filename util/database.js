// const mysql = require("mysql2");

// const pool = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	database: "node_practice",
// 	password: "Dhyeysapara1512!",
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node_practice", "root", "Dhyeysapara1512!", {
// 	dialect: "mysql",
// 	host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
	MongoClient.connect(
		"mongodb+srv://dhyey:dhyey@node-prac.n0kgacp.mongodb.net/shop?retryWrites=true&w=majority&appName=node-prac"
	)
		.then(client => {
			console.log("Connected");
			_db = client.db();
			callback();
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
