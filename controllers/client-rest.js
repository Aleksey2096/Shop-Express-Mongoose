const Product = require('../entities/product');
const fileHandler = require('../util/file-handler');

exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        return req.user.addToCart(product);
      })
      .then(result => {
        res.status(201).json({ message: 'Success!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Adding product to cart failed!' });
      });
  };

  exports.deleteCartProduct = (req, res, next) => {
    const prodId = req.params.productId;
    req.user
      .deleteFromCart(prodId)
      .then(result => {
        res.status(200).json({ message: 'Success!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Deleting product from cart failed!' });
      });
  };

  exports.deleteUserProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return next(new Error('Product not found.'));
        }
        fileHandler.deleteFile(product.imagePath);
        return Product.deleteOne({ _id: prodId, userId: req.user._id });
      })
      .then(() => {
        res.status(200).json({ message: 'Success!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Deleting user product failed!' });
      });
  };