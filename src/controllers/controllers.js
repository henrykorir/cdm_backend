import connection from '../api/connection'
import { 
	cdm_categories_report,
	patients_record_report,
	patients_per_new_hypertensive_status, 
	patients_per_known_hypertensive_status,
	patients_per_new_diabetic_status,
	patients_per_known_diabetic_status,
	patients_per_hypertensive_and_diabetic_status 
} from '../api/constants'

const categoriesReportController = (req, res) =>{
	connection.query(cdm_categories_report,  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}

const patientsRecordController = (req, res) =>{
	connection.query(patients_record_report,  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}

const newHypertensiveController = ( req, res ) => {
	console.log(req.query)
	connection.query(patients_per_new_hypertensive_status,[req.query.location],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}

const knownHypertensiveController = ( req, res ) => {
	
	connection.query(patients_per_known_hypertensive_status,[req.query.location],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}
const newDiabeticController = ( req, res ) => {
	
	connection.query(patients_per_new_diabetic_status,[req.query.location],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}
const knownDiabeticController = ( req, res ) => {
	connection.query(patients_per_known_diabetic_status,[req.query.location],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}
const hypertensiveDiabeticController = ( req, res ) => {
	
	connection.query(patients_per_hypertensive_and_diabetic_status,[req.query.location],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}
export{ 
	categoriesReportController, 
	patientsRecordController,
	newHypertensiveController,
	knownHypertensiveController,
	newDiabeticController,
	knownDiabeticController,
	hypertensiveDiabeticController
}