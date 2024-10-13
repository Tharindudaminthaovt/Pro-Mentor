import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface GetLocationListResponse {
	id: string
	location: string
}

export const useGetLocationList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetLocationListResponse[]
	>(
		api.Get_Locations({
			page: '0',
			size: '0',
		}),
		'GET'
	)

	return {
		getLocationsListResponse: data,
		error_getLocations: error,
		isLoading_getLocations: isLoading,
		isValidating_getLocations: isValidating,
		mutate_getLocations: customMutate,
	}
}
