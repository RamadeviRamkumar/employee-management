
const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');


router.post('/signin', AdminController.Signin);
router.post('/register', AdminController.Register);
router.post('/staff', AdminController.create);

router.route('/users')
    .get(AdminController.index);

router.route('/users/:email')
    .get(AdminController.view)
    .patch(AdminController.update)
    .put(AdminController.update)
    .delete(AdminController.Delete);

module.exports = router;
