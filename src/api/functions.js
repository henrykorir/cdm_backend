import connection from 'connection' 

const cdm_categories = () => {
	connection.connect()
	
	connection.query('SELECT 1 + 1 AS solution',  (err, rows, fields) => {
		if (err) throw err
		console.log('The solution is: ', rows[0].solution)
	})
	connection.end()
}
export default cdm_categories