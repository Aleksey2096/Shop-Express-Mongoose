const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./entities/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/client');
const errorRoutes = require('./routes/error');

const app = express();

const MONGODB_URI = 'mongodb+srv://root:1111@cluster0.wojol5r.mongodb.net/simonstarget?retryWrites=true&w=majority';

const sessionStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.set('view engine', 'ejs');

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/resources/images', express.static(path.join(__dirname, 'resources', 'images')));
app.use(session({
    secret: 'top secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(csrf());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (user) {
                req.user = user;
            }
            return next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(clientRoutes);
app.use(errorRoutes);
app.use((err, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Server Side Error',
        path: '/500',
        error: err,
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin
    });
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })