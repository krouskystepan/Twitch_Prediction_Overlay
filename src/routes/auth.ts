import express from 'express'
const router = express.Router()

import * as authController from '../controllers/auth'

router.get('/login', authController.login)
router.get('/callback', authController.callback)

module.exports = router
