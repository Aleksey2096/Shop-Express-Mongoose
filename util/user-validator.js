const authController = require('../controllers/auth');

exports.validateLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    if (req.user.isBlocked) {
        return authController.postLogout(req, res, next);
    }
    next();
}

exports.validateAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect('/login');
    }
    if (req.user.isBlocked) {
        return authController.postLogout(req, res, next);
    }
    next();
}
