// const db = require("../util/database");

// const Cart = require("./cart");

// module.exports = class Product {
// 	constructor(id, title, imageUrl, description, price) {
// 		this.id = id;
// 		this.title = title;
// 		this.imageUrl = imageUrl;
// 		this.description = description;
// 		this.price = price;
// 	}

// 	save() {
// 		return db.execute(
// 			"INSERT into products (title, price, imageUrl, description) VALUES (?,?,?,?)",
// 			[this.title, this.price, this.imageUrl, this.description]
// 		);
// 	}
// };

// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = require("../util/database");

// const Product = sequelize.define("product", {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		autoIncrement: true,
// 		allowNull: false,
// 		primaryKey: true,
// 	},
// 	title: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},
// 	price: {
// 		type: DataTypes.DOUBLE,
// 		allowNull: false,
// 	},
// 	imageUrl: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},
// 	description: {
// 		type: DataTypes.TEXT,
// 		allowNull: false,
// 	},
// });

// module.exports = Product;

const { mongodb, ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		const db = getDb();
		return db
			.collection("products")
			.insertOne(this)
			.then(result => {
				console.log("Saved");
			})
			.catch(err => {
				console.log(err);
			});
	}

	update(prodId) {
		const db = getDb();
		return db
			.collection("products")
			.updateOne({ _id: new ObjectId(prodId) }, { $set: this })
			.then(result => {
				console.log("updated");
			})
			.catch(err => {
				console.log(err);
			});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then(products => {
				return products;
			})
			.catch(err => {
				console.log(err);
			});
	}

	static fetchById(prodId) {
		const db = getDb();
		return db
			.collection("products")
			.find({ _id: new ObjectId(prodId) })
			.next()
			.then(product => {
				return product;
			})
			.catch(err => {
				console.log(err);
			});
	}

	static deleteById(prodId) {
		const db = getDb();
		return db
			.collection("products")
			.deleteOne({ _id: new ObjectId(prodId) })
			.then(product => {
				console.log("Deleted");
			})
			.catch(err => {
				console.log(err);
			});
	}
}

module.exports = Product;
