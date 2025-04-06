import express from 'express'
const router = express.Router()

import * as predictionsController from '../controllers/predictions'

router.get('/', predictionsController.getPredictions)

module.exports = router
