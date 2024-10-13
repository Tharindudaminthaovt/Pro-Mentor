import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useEffect, useState } from 'react'
import { GetLocationListResponse } from './useGetLocationList'
import { GetModalityListResponse } from './useGetModalityList'
import { GetTagsListResponse } from './useGetTagsList'
import { GetJobTypeListResponse } from './useGetJobTypeList'

const api = new SocialService()

export interface GetJobListResponse {
	id: string
	title: string
	companyName: string
	createdAt: string
	createdBy: string
	description: string
	location: GetLocationListResponse
	modality: GetModalityListResponse
	tags: GetTagsListResponse[]
	updatedAt: string
	type: GetJobTypeListResponse
}

export const useGetJobList = () => {
	const [size, setSize] = useState('0')
	const [search, setSearch] = useState('')
	const [locationId, setLocationId] = useState<string[]>([])
	const [modalityId, setModalityId] = useState<string[]>([])
	const [typeId, setTypeId] = useState<string[]>([])
	const [tagId, setTagId] = useState<string[]>([])
	const [params, setParams] = useState<any>()
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetJobListResponse[]
	>(api.Get_Jobs(params), 'GET')

	useEffect(() => {
		console.log(locationId, search, modalityId, typeId)

		setParams({
			page: '0',
			size: size,
			search: search,
			'location-ids': locationId.join(','),
			'modality-ids': modalityId.join(','),
			'type-ids': typeId.join(','),
			'tag-ids': tagId.join(','),
		})
	}, [locationId, search, modalityId, typeId, size, tagId])

	return {
		getJobsListResponse: data,
		error_getJobs: error,
		isLoading_getJobs: isLoading,
		isValidating_getJobs: isValidating,
		mutate_getJobs: customMutate,
		setSearch_getJobs: setSearch,
		setLocationId_getJobs: setLocationId,
		setModalityId_getJobs: setModalityId,
		setTypeId_getJobs: setTypeId,
		setTagId_getJobs: setTagId,
		setSize_getJobs: setSize,
	}
}
