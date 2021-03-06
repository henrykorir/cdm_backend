import connection from './connection' 
const query = `
		select 
					table_a.name as 'Location',
					table_a.NH as 'New Hypertensive',
					table_a.KH as 'Known Hypertensive',
					table_a.ND as 'New Diabetic',
					table_a.KD as 'Known Diabetic',
					table_a.HD as 'Hypertensive and Diabetic'
				from(
						select
								location.name,
								flat_cdm_summary.location_id,
								sum(if(flat_cdm_summary.htn_status = 7285, 1, 0)) as 'NH',
								sum(if(flat_cdm_summary.htn_status = 7286, 1, 0)) as 'KH',
								sum(if(flat_cdm_summary.dm_status = 7281, 1, 0)) as 'ND',
								sum(if(flat_cdm_summary.dm_status = 7282, 1, 0)) as 'KD',
								sum(
									if(
										(	(flat_cdm_summary.htn_status = 7285 and flat_cdm_summary.dm_status = 7281) || 
											(flat_cdm_summary.htn_status = 7285 and flat_cdm_summary.dm_status = 7282) ||
											(flat_cdm_summary.htn_status = 7286 and flat_cdm_summary.dm_status = 7281) ||
											(flat_cdm_summary.htn_status = 7286 and flat_cdm_summary.dm_status = 7282)
										)
										, 
										1, 
										0
									)
								) as 'HD'
						from flat_cdm_summary inner join location on location.id = flat_cdm_summary.location_id
						group by flat_cdm_summary.location_id
				)table_a`
const cdm_categories = () => {
	connection.connect()
	
	connection.query(query,  (err, rows, fields) => {
		if (err) throw err
		console.log(rows)
	})
	connection.end()
}
export default cdm_categories