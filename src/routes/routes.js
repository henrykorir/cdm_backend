import express from 'express' 

import {
	categoriesReportController, 
	patientsRecordController,
	newHypertensiveController,
	knownHypertensiveController,
	newDiabeticController,
	knownDiabeticController,
	hypertensiveDiabeticController
}from '../controllers/controllers'

const router = express.Router()

router.get('/', categoriesReportController)
router.get('/patients', patientsRecordController)
router.get('/patients/hypertensive/new', newHypertensiveController)
router.get('/patients/hypertensive/known', knownHypertensiveController)
router.get('/patients/diabetic/new', newDiabeticController)
router.get('/patients/diabetic/known', knownDiabeticController)
router.get('/patients/both', hypertensiveDiabeticController)

export default router
