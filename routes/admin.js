const express = require('express');
const AdminController = require('../controllers/Admin');
const SecurityController = require('../controllers/Security');

const router = express.Router();

// SECTION: ADMIN ROUTES

router.route('/').post(AdminController.createAdmin);
router.route('/:username').get(AdminController.readAdminByUsername);
router.route('/del/:id').delete(AdminController.deleteAdmin);

// SECTION: SECURITY ROUTES
// ANCHOR: QUESTION

router.route('/verify/:adminId').get(SecurityController.getSecurityQuestions);
router
  .route('/verify/new/security-question')
  .post(SecurityController.createSecurityQuestion);
router
  .route('/verify/security-question/del/:securityQuestionId')
  .delete(SecurityController.deleteSecurityQuestion);

// ANCHOR: ANSWERS

router
  .route('/verify/responses/by-sqid/:questionId')
  .get(SecurityController.getSAByQuestionId);
router
  .route('/verify/new/security-answer')
  .post(SecurityController.createSecurityAnswer);
router.route('/verify/responses').post(SecurityController.compareSecurityAnswer);

module.exports = router;
