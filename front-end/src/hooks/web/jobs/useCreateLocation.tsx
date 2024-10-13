import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetLocationListResponse } from './useGetLocationList'

const api = new SocialService()

export type CreateLocationRequest = {
	location: string
}

export const useCreateLocation = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateLocationRequest, GetLocationListResponse>(
		api.Post_Location(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createLocationResponse: data,
		setCreateLocationRequest: setRequest,
		error_createLocation: error,
		isLoading_createLocation: isLoading,
		isValidating_createLocation: isValidating,
		mutate_createLocation: mutate,
		setIsRequestReady_createLocation: setIsRequestReady,
	}
}
