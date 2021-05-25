import express from 'express' 

import {
	categoriesReportController, 
	patientsRecordController,
	newHypetensiveController,
	knownHypetensiveController,
	newDiabeticController,
	knownDiabeticController,
	hypertensiveDiabeticController
}from '../controllers/controllers'

const router = express.Router()

router.get('/', categoriesReportController)
router.get('/patients', patientsRecordController)
router.get('/patients/hypetensive/new', newHypetensiveController)
router.get('/patients/hypetensive/known', knownHypetensiveController)
router.get('/patients/diabetic/new', newDiabeticController)
router.get('/patients/diabetic/known', knownDiabeticController)
router.get('/patients/both', hypertensiveDiabeticController)

export default router
