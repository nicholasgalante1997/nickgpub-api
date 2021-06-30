const express = require('express')
const AdminController = require('../controllers/Admin')
const SecurityController = require('../controllers/Security')

const router = express.Router()

router.route('/').post(AdminController.createAdmin)
router.route('/:username').get(AdminController.readAdminByUsername)
router.route('/del/:id').delete(AdminController.deleteAdmin)

// SECURITY ROUTES
router.route('/verify/:adminId').get(SecurityController.getSecurityQuestions)
router
    .route('/verify/new/securityQuestion')
    .post(SecurityController.createSecurityQuestion)

module.exports = router
