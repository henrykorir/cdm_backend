import connection from '../api/connection'
import { 
	cdm_categories_report, 
	patients_record_report 
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
	//connection.end()
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
	//connection.end()
}
export{ categoriesReportController, patientsRecordController }