import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface GetModalityListResponse {
	id: string
	key: string
}

export const useGetModalityList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetModalityListResponse[]
	>(
		api.Get_ModalityList({
			page: '0',
			size: '0',
		}),
		'GET'
	)

	return {
		getModalityListResponse: data,
		error_getModality: error,
		isLoading_getModality: isLoading,
		isValidating_getModality: isValidating,
		mutate_getModality: customMutate,
	}
}
