import connection from '../api/connection'
import { 
	cdm_categories_report,
	patients_record_report,
	patients_per_new_hypertensive_status, 
	patients_per_known_hypertensive_status,
	patients_per_new_diabetic_status,
	patients_per_known_diabetic_status,
	patients_per_hypetensive_and_diabetic_status 
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

const newHypetensiveController = ( req, res ) => {
	connection.query(patients_per_new_hypertensive_status,[r],  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
}
export{ categoriesReportController, patientsRecordController }