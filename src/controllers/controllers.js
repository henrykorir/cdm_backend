import connection from '../api/connection'
import cdm_categories_report from '../api/constants'

const indexController = (req, res) =>{
	connection.query(cdm_categories_report,  (err, rows, fields) => {
		if (err) throw err
		res.json({
			status: 200,
			rows,
			message: "User lists retrieved successfully"
		})
	})
	connection.end()
}
export default indexController