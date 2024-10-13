import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetModalityListResponse } from './useGetModalityList'

const api = new SocialService()

export type CreateModalityRequest = {
	key: string
}

export const useCreateModality = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateModalityRequest, GetModalityListResponse>(
		api.Post_Modality(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createModalityResponse: data,
		setCreateModalityRequest: setRequest,
		error_createModality: error,
		isLoading_createModality: isLoading,
		isValidating_createModality: isValidating,
		mutate_createModality: mutate,
		setIsRequestReady_createModality: setIsRequestReady,
	}
}
