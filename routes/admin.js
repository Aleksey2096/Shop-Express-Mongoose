const router = require('express').Router();

const adminController = require('../controllers/admin');
const adminRestController = require('../controllers/admin-rest');
const { validateAdmin } = require('../util/user-validator');

router.get('/orders', validateAdmin, adminController.getAllPaginatedOrders);

router.get('/users', validateAdmin, adminController.getPaginatedUsers);

router.patch('/change-user-block-status', validateAdmin, adminRestController.patchChangeUserBlockStatus);

module.exports = router;