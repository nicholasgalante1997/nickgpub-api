const express = require('express')
const AdminController = require('../controllers/Admin')

const router = express.Router()

router.route('/').post(AdminController.createAdmin)

router.route('/:username').get(AdminController.readAdminByUsername)

router.route('/del/:id').delete(AdminController.deleteAdmin)

module.exports = router
