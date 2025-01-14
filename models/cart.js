const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
	static addproduct(id, prodPrice) {
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			const existingProductIndex = cart.products.findIndex(p => p.id === id);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;

			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +prodPrice;
			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err);
			});
		});
	}

	static deleleProductById(id, price) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent) };
			const product = updatedCart.products.find(prod => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(prod => prod === id);
			updatedCart.totalPrice = updatedCart.totalPrice - product.price * productQty;
			fs.writeFile(p, JSON.stringify(updatedCart), err => {
				console.log(err);
			});
		});
	}

	static getCartProducts(cb) {
		fs.readFile(p, (err, fileContent) => {
			const cart = JSON.parse(fileContent);
			if (!cart) {
				cb(null);
			} else {
				cb(cart);
			}
		});
	}
};
