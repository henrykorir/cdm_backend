import express from 'express' 

import {
	categoriesReportController,
	patientsRecordController
}from '../controllers/controllers'

const router = express.Router()

router.get('/', categoriesReportController)
router.get('/patients', patientsRecordController)

export default router
