import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface GetModeListResponse {
	id: string
	key: string
}

export const useGetModeList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetModeListResponse[]
	>(
		api.Get_ModeList({
			page: '0',
			size: '0',
		}),
		'GET'
	)

	return {
		getModeListResponse: data,
		error_getMode: error,
		isLoading_getMode: isLoading,
		isValidating_getMode: isValidating,
		mutate_getMode: customMutate,
	}
}
