import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export type CreateEventRequest = {
	title: string
	description: string
	companyName: string
	modeId: string
	locationId: string
	time: string
	tags: { id: string; key: string }[]
	url: string
}

export const useCreateEvent = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateEventRequest, any>(api.Post_CreateEvent(), 'POST')

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createEventResponse: data,
		setCreateEventRequest: setRequest,
		error_createEvent: error,
		isLoading_createEvent: isLoading,
		isValidating_createEvent: isValidating,
		mutate_createEvent: mutate,
		setIsRequestReady_createEvent: setIsRequestReady,
	}
}
