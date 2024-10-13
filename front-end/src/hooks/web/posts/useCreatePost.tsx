import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export type CreatePostRequest = {
	imageUrl: string
	description: string
}

export const useCreatePost = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreatePostRequest, any>(api.Post_CreatePost(), 'POST')

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createPostResponse: data,
		setCreatePostRequest: setRequest,
		error_createPost: error,
		isLoading_createPost: isLoading,
		isValidating_createPost: isValidating,
		mutate_createPost: mutate,
		setIsRequestReady_createPost: setIsRequestReady,
	}
}
