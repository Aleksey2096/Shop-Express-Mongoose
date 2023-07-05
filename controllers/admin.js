const Order = require('../entities/order');
const User = require('../entities/user');

const ORDERS_PER_PAGE = 3;
const USERS_PER_PAGE = 6;

exports.getAllPaginatedOrders = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    Order.find()
        .countDocuments()
        .then(numOrders => {
            totalItems = numOrders;
            return Order.find()
                .skip((page - 1) * ORDERS_PER_PAGE)
                .limit(ORDERS_PER_PAGE);
        })
        .then(orders => {
            res.render('admin/orders', {
                path: '/admin/orders',
                pageTitle: 'All Orders',
                orders,
                currentPage: page,
                lastPage: Math.ceil(totalItems / ORDERS_PER_PAGE)
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getPaginatedUsers = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    User.find()
        .countDocuments()
        .then(numUsers => {
            totalItems = numUsers;
            return User.find()
                .skip((page - 1) * USERS_PER_PAGE)
                .limit(USERS_PER_PAGE);
        })
        .then(users => {
            res.render('admin/users', {
                path: '/admin/users',
                pageTitle: 'Users',
                users,
                currentPage: page,
                lastPage: Math.ceil(totalItems / USERS_PER_PAGE)
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
