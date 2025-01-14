const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, price, description, imageUrl);
	product.save().then(() => {
		res.redirect("/");
	});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.fetchById(prodId).then(product => {
		if (!product) {
			res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const updateProduct = new Product(title, price, description, imageUrl);
	updateProduct.update(prodId).then(() => {
		res.redirect("/admin/products");
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll().then(products => {
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect("/admin/products");
};
