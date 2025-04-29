import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useEffect, useState } from 'react'
import { GetLocationListResponse } from '../jobs/useGetLocationList'
import { GetTagsListResponse } from '../jobs/useGetTagsList'
import { GetModeListResponse } from './useGetModeList'
import { useDispatch } from 'react-redux'
import { setEventList } from '../../../features/events/eventSlice'

const api = new SocialService()

export interface GetEventListResponse {
	id: string
	title: string
	companyName: string
	createdAt: string
	createdBy: string
	description: string
	location: GetLocationListResponse
	mode: GetModeListResponse
	tags: GetTagsListResponse[]
	updatedAt: string
	time: string
	url: string
}

export const useGetEventList = () => {
	const [size, setSize] = useState('0')
	const [search, setSearch] = useState('')
	const [locationId, setLocationId] = useState<string[]>([])
	const [modeId, setModeId] = useState<string[]>([])
	const [typeId, setTypeId] = useState<string[]>([])
	const [tagId, setTagId] = useState<string[]>([])
	const [params, setParams] = useState<any>()
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetEventListResponse[]
	>(api.Get_Events(params), 'GET')
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (data) {
	// 		dispatch(setEventList(data))
	// 	}
	// }, [data, dispatch])

	useEffect(() => {
		console.log(locationId, search, modeId, typeId)

		setParams({
			page: '0',
			size: size,
			search: search,
			'location-ids': locationId.join(','),
			'mode-ids': modeId.join(','),
			'type-ids': typeId.join(','),
			'tag-ids': tagId.join(','),
		})
	}, [locationId, search, modeId, typeId, size, tagId])
	return {
		getEventsListResponse: data,
		error_getEvents: error,
		isLoading_getEvents: isLoading,
		isValidating_getEvents: isValidating,
		mutate_getEvents: customMutate,
		setSearch_getEvents: setSearch,
		setLocationId_getEvents: setLocationId,
		setModeId_getEvents: setModeId,
		setTypeId_getEvents: setTypeId,
		setTagId_getEvents: setTagId,
		setSize_getEvents: setSize,
	}
}
