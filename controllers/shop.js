const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.fetchAll().then(products => {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productid;
	Product.fetchById(productId).then(product => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll().then(products => {
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	});
};

// exports.getCart = (req, res, next) => {
// 	Cart.getCartProducts(cart => {
// 		Product.fetchAll(products => {
// 			const cartProducts = [];
// 			for (const product of products) {
// 				const cartProductDetail = cart.products.find(prod => prod.id === product.id);
// 				if (cartProductDetail) {
// 					cartProducts.push({ productData: product, qty: cartProductDetail.qty });
// 				}
// 			}
// 			console.log(cartProducts);
// 			res.render("shop/cart", {
// 				path: "/cart",
// 				pageTitle: "Your Cart",
// 				products: cartProducts,
// 			});
// 		});
// 	});
// };

// exports.postCart = (req, res, next) => {
// 	const prodId = req.body.productId;
// 	console.log(prodId);
// 	Product.fetchById(prodId, product => {
// 		Cart.addproduct(prodId, product.price);
// 	});
// 	res.redirect("/");
// };

// exports.postDeleteCartItem = (req, res, next) => {
// 	const prodId = req.body.productId;
// 	const prodPrice = req.body.productPrice;
// 	Cart.deleleProductById(prodId, prodPrice);
// 	res.redirect("/cart");
// };

// exports.getOrders = (req, res, next) => {
// 	res.render("shop/orders", {
// 		path: "/orders",
// 		pageTitle: "Your Orders",
// 	});
// };

// exports.getCheckout = (req, res, next) => {
// 	res.render("shop/checkout", {
// 		path: "/checkout",
// 		pageTitle: "Checkout",
// 	});
// };
