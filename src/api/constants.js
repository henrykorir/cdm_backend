const cdm_categories_report = `
	select 
		concat(year(flat_cdm_summary.encounter_datetime),'-',month(flat_cdm_summary.encounter_datetime)) as Month,
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
	inner join flat_cdm_summary on flat_cdm_summary.location_id = table_a.location_id
	group by Location, month, table_a.NH, table_a.KH, table_a.ND, table_a.KD, table_a.HD;
`;

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

const patients_per_new_hypertensive_status = `
	select 
		patient.name, 
		date(flat_cdm_summary.encounter_datetime) as 'encounter_date', 
		location.name,
		flat_cdm_summary.htn_status,
		patient.gender,
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id
	where htn_status = 7285 && location.name = ?;
`
const patients_per_known_hypertensive_status = `
	select 
		patient.name, 
		date(flat_cdm_summary.encounter_datetime) as 'encounter_date', 
		location.name,
		flat_cdm_summary.htn_status,
		patient.gender,
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id
	where htn_status = 7286 && location.name = ?;
`
const patients_per_new_diabetic_status = `
	select 
		patient.name, 
		date(flat_cdm_summary.encounter_datetime) as 'encounter_date', 
		location.name,
		flat_cdm_summary.dm_status,
		patient.gender,
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id
	where dm_status = 7281 && location.name = ?;
`
const patients_per_known_diabetic_status = `
	select 
		patient.name, 
		date(flat_cdm_summary.encounter_datetime) as 'encounter_date', 
		location.name,
		flat_cdm_summary.dm_status,
		patient.gender,
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id
	where dm_status = 7282 && location.name = ?;
`
const patients_per_hypertensive_and_diabetic_status = `
	select 
		patient.name, 
		date(flat_cdm_summary.encounter_datetime) as 'encounter_date', 
		location.name,
		flat_cdm_summary.htn_status,
		flat_cdm_summary.dm_status,
		patient.gender,
		timestampdiff(year,patient.dob, curdate()) AS Age
	from patient 
	inner join flat_cdm_summary on patient.patient_id = flat_cdm_summary.patient_id
	inner join location on location.id = flat_cdm_summary.location_id
	where (	
			(flat_cdm_summary.htn_status = 7285 and flat_cdm_summary.dm_status = 7281) || 
			(flat_cdm_summary.htn_status = 7285 and flat_cdm_summary.dm_status = 7282) ||
			(flat_cdm_summary.htn_status = 7286 and flat_cdm_summary.dm_status = 7281) ||
			(flat_cdm_summary.htn_status = 7286 and flat_cdm_summary.dm_status = 7282)
	) && location.name = ?;
`
export{	
	cdm_categories_report,
	patients_record_report,
	patients_per_new_hypertensive_status, 
	patients_per_known_hypertensive_status,
	patients_per_new_diabetic_status,
	patients_per_known_diabetic_status,
	patients_per_hypertensive_and_diabetic_status
}
