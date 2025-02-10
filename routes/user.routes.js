const { register,login, deleteUser } = require('../controllers/user.controller')
const authenticateUser = require('../middlewares/authentication')

const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)
router.post('/deleteUser',authenticateUser, deleteUser)

module.exports = router
