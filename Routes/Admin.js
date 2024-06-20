
const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

// Signin route
router.post('/signin', AdminController.Signin);

// Register route
router.post('/register', AdminController.Register);

// User controller routes
router.route('/users')
    .get(AdminController.index);

router.route('/users/:email')
    .get(AdminController.view)
    .patch(AdminController.update)
    .put(AdminController.update)
    .delete(AdminController.Delete);

module.exports = router;
