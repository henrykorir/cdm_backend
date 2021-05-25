import express from 'express' 

import categoriesReportController from '../controllers/controllers'

const router = express.Router()

router.get('/', categoriesReportController)

export default router
