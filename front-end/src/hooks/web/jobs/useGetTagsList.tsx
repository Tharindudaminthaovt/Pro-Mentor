import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface GetTagsListResponse {
	id: string
	key: string
}

export const useGetTagsList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetTagsListResponse[]
	>(
		api.Get_Tags({
			page: '0',
			size: '0',
		}),
		'GET'
	)

	return {
		getTagsListResponse: data,
		error_getTags: error,
		isLoading_getTags: isLoading,
		isValidating_getTags: isValidating,
		mutate_getTags: customMutate,
	}
}
