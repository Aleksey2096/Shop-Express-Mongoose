const User = require('../entities/user');

exports.patchChangeUserBlockStatus = (req, res, next) => {
    const userId = req.body.userId;
    User.findById(userId)
        .then(user => {
            user.isBlocked = !user.isBlocked;
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'Success!' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Changing user block status failed!' });
        });
};