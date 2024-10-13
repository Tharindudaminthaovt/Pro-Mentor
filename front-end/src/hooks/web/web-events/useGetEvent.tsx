import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useState } from 'react'
import { GetEventListResponse } from './useGetEventList'

const api = new SocialService()

export const useGetEvent = () => {
	const [eventId, setEventId] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetEventListResponse
	>(eventId ? api.Get_Event(eventId) : null, 'GET')

	return {
		getEventResponse: data,
		error_getEvent: error,
		isLoading_getEvent: isLoading,
		isValidating_getEvent: isValidating,
		mutate_getEvent: customMutate,
		setEventId_getEvent: setEventId,
	}
}
