import { useState } from 'react'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export const useDeletePost = () => {
	const [postId, setPostId] = useState('')
	const { data, error, isLoading, isValidating, mutate, setIsRequestReady } =
		useCustomSWR<any, any>(
			postId ? api.Delete_deletePost(postId) : null,
			'DELETE'
		)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		deletePostResponse: data,
		error_deletePost: error,
		isLoading_deletePost: isLoading,
		isValidating_deletePost: isValidating,
		mutate_deletePost: mutate,
		setPostId_deletePost: setPostId,
		setIsRequestReady_deletePost: setIsRequestReady,
	}
}
