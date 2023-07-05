const stripe = require('stripe')('sk_test_51NNwqEAs3eQVc0QDdj2w2hZX1Lb90ZLy4OSuW4k9Dx3ImUQJraiwDtaBCygV2ERnLV8leK77l0twwieyyFojRA2P008Zorv5Xi');
const { validationResult } = require('express-validator');

const fileHandler = require('../util/file-handler');
const pdfWriter = require('../util/pdf-writer');
const Product = require('../entities/product');
const Order = require('../entities/order');

const PRODUCTS_PER_PAGE = 3;

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find({ 'amount': { $gt: 0 } })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Product.find({ 'amount': { $gt: 0 } })
        .skip((page - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
    })
    .then(products => {
      res.render('client/index', {
        prods: products,
        pageTitle: 'Home',
        path: '/',
        currentPage: page,
        lastPage: Math.ceil(totalItems / PRODUCTS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('client/product-detail', {
        product,
        pageTitle: product.name,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart;
      res.render('client/cart', {
        path: '/cart',
        pageTitle: 'My Cart',
        products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  let products;
  let total = 0;
  req.user
    .populate('cart.productId')
    .execPopulate()
    .then(user => {
      products = user.cart.map(p => {
        p.quantity = req.query[p.productId._id];
        return p;
      });
      total = 0;
      products.forEach(p => {
        total += p.quantity * p.productId.price;
      });
      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(p => {
          return {
            price_data: {
              unit_amount: p.productId.price * 100,
              currency: 'usd',
              product_data: {
                name: p.productId.name,
                description: p.productId.description
              },
            },
            quantity: p.quantity
          }
        }),
        mode: 'payment',
        success_url: req.protocol + '://' + req.get('host') + '/checkout/success' + req.url.substr(req.url.indexOf('?')),
        cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
      });
    })
    .then(session => {
      res.render('client/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        products,
        totalSum: total.toFixed(2),
        sessionId: session.id
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckoutSuccess = (req, res, next) => {
  let order;
  req.user
    .populate('cart.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.map(i => {
        return { quantity: req.query[i.productId._id], product: { ...i.productId._doc } };
      });
      order = new Order({
        userId: req.user,
        orderItems: products,
        date: new Date()
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      const bulkOps = order.orderItems.map(item => {
        return {
          updateOne: {
            filter: {
              _id: item.product._id
            },
            update: {
              amount: item.product.amount - item.quantity
            }
          }
        }
      });
      return Product.bulkWrite(bulkOps);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'userId': req.user._id })
    .then(orders => {
      res.render('client/orders', {
        path: '/orders',
        pageTitle: 'My Orders',
        orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No order found.'));
      }
      if (order.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized'));
      }
      pdfWriter.writePDFInvoice(res, order);
    })
    .catch(err => next(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render('client/edit-product', {
    pageTitle: 'Add Product',
    path: '/client/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const state = req.body.state;
  const amount = req.body.amount;
  if (!image) {
    return res.status(422).render('client/edit-product', {
      pageTitle: 'Add Product',
      path: '/client/add-product',
      editing: false,
      hasError: true,
      product: { name, price, description, state, amount },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('client/edit-product', {
      pageTitle: 'Add Product',
      path: '/client/add-product',
      editing: false,
      hasError: true,
      product: { name, price, description, state, amount },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imagePath = image.path;

  const product = new Product({
    name, price, description, state, amount, imagePath,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      res.redirect('/user-products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('client/edit-product', {
        pageTitle: 'Edit Product',
        path: '/client/edit-product',
        editing: editMode,
        product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const name = req.body.name;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const state = req.body.state;
  const amount = req.body.amount;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('client/edit-product', {
      pageTitle: 'Edit Product',
      path: '/client/edit-product',
      editing: true,
      hasError: true,
      product: {
        name, price, description, state, amount,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.name = name;
      product.price = price;
      product.description = description;
      product.state = state;
      product.amount = amount;
      if (image) {
        fileHandler.deleteFile(product.imagePath);
        product.imagePath = image.path;
      }
      return product.save().then(result => {
        res.redirect('/user-products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getUserProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then(products => {
      res.render('client/user-products', {
        prods: products,
        pageTitle: 'My Products',
        path: '/client/user-products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
