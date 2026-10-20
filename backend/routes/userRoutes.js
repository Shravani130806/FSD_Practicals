const express = require('express')
const { body, validationResult } = require('express-validator')
const { registerUser, loginUser, getProfile } = require('../controllers/userController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware')

const router = express.Router()

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    })
  }

  next()
}

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['student', 'organizer', 'admin']).withMessage('Role must be student, organizer, or admin'),
  ],
  validate,
  registerUser,
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  loginUser,
)

router.get('/profile', protect, getProfile)
router.get('/admin-test', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' })
})

module.exports = router
