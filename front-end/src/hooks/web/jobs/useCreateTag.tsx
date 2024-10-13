import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetTagsListResponse } from './useGetTagsList'

const api = new SocialService()

export type CreateTagRequest = {
	key: string
}

export const useCreateTag = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateTagRequest, GetTagsListResponse>(
		api.Post_Tag(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createTagResponse: data,
		setCreateTagRequest: setRequest,
		error_createTag: error,
		isLoading_createTag: isLoading,
		isValidating_createTag: isValidating,
		mutate_createTag: mutate,
		setIsRequestReady_createTag: setIsRequestReady,
	}
}
