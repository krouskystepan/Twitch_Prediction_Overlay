import express from 'express'
const router = express.Router()

import * as mockPredictionsController from '../controllers/mockPredictions'

router.get('/', mockPredictionsController.getMockPrediction)

router.post(
  '/create/:outcomesCount',
  mockPredictionsController.createMockPrediction
)
router.post('/cancel', mockPredictionsController.cancelMockPrediction)
router.post('/lock', mockPredictionsController.lockMockPrediction)
router.post('/resolve', mockPredictionsController.resolveMockPrediction)

router.delete('/reset', mockPredictionsController.resetMockPredictions)

module.exports = router
