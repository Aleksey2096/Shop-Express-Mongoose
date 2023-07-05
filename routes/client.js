const router = require('express').Router();
const { body } = require('express-validator');

const clientController = require('../controllers/client');
const clientRestController = require('../controllers/client-rest');
const { validateLoggedIn } = require('../util/user-validator');

const productValidation = [
    body('name', 'Name must be a string from 3 characters long!')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('price', 'Price must be a number between 0.01 and infinity!')
        .isFloat({ min: 0.01 }),
    body('state', 'State must be an integer between 1 and 10!')
        .isInt({ min: 1, max: 10 }),
    body('amount', 'Amount must be an integer between 1 and infinity!')
        .isInt({ min: 1 }),
    body('description', 'Description must be a string 5 to 400 characters long!')
        .isLength({ min: 5, max: 400 })
        .trim()
];

router.get('/', clientController.getIndex);

router.get('/products/:productId', clientController.getProduct);

router.get('/cart', validateLoggedIn, clientController.getCart);

router.post('/cart', validateLoggedIn, clientRestController.postAddToCart);

router.delete('/cart/:productId', validateLoggedIn, clientRestController.deleteCartProduct);

router.get('/checkout', validateLoggedIn, clientController.getCheckout);

router.get('/checkout/success', clientController.getCheckoutSuccess);

router.get('/checkout/cancel', clientController.getCheckout);

router.get('/orders', validateLoggedIn, clientController.getOrders);

router.get('/orders/:orderId', validateLoggedIn, clientController.getInvoice);

router.get('/add-product', validateLoggedIn, clientController.getAddProduct);

router.get('/user-products', validateLoggedIn, clientController.getUserProducts);

router.post('/add-product', productValidation, validateLoggedIn, clientController.postAddProduct);

router.get('/edit-product/:productId', validateLoggedIn, clientController.getEditProduct);

router.post('/edit-product', productValidation, validateLoggedIn, clientController.postEditProduct);

router.delete('/product/:productId', validateLoggedIn, clientRestController.deleteUserProduct);

module.exports = router;