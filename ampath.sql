--Ampath Database 
select 
	location.name as 'Location',
	temp.NH as 'New Hypertensive',
	temp.KH as 'Known Hypertensive',
	temp.ND as 'New Diabetic',
	temp.KD as 'Known Diabetic',
	temp.HD as 'Hypertensive and Diabetic'
from(
		select
				flat_cdm_summary.location_id as 'location_id',
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
		group by flat_cdm_summary.location_id
)temp
inner join location on location.id = temp.location_id;