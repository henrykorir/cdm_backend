
/*const cdm_categories_report = `
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
				)table_a
				inner join location on location.id = table_a.location_id;
`;
*/
const cdm_categories_report = `
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
	from flat_cdm_summary 
	inner join location on location.id = flat_cdm_summary.location_id
	group by flat_cdm_summary.location_id;
`
const patients_record_report = `
	select 
		patient.name as 'PatientName', 
		date(flat_cdm_summary.encounter_datetime) as 'Encounter Date', 
		location.name as 'Location',
		case
			when flat_cdm_summary.htn_status = 7285 then "New"
			when flat_cdm_summary.htn_status = 7286 then "Known"
			else NULL
		end as 'Hypertension Status',
		case
			when flat_cdm_summary.dm_status = 7281 then "New"
			when flat_cdm_summary.dm_status = 7282 then "Known"
			else NULL
		end as 'Diabetes Status',
		if(patient.gender ="MALE","M","F") as 'Gender', 
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id;
`
export{	cdm_categories_report,	patients_record_report }
