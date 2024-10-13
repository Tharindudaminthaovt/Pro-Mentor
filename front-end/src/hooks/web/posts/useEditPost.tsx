import { useState } from 'react'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { CreatePostRequest } from './useCreatePost'

const api = new SocialService()

export const useEditPost = () => {
	const [postId, setPostId] = useState('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreatePostRequest, any>(
		postId ? api.Put_EditPost(postId) : null,
		'PUT'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		editPostResponse: data,
		setEditPostRequest: setRequest,
		error_editPost: error,
		isLoading_editPost: isLoading,
		isValidating_editPost: isValidating,
		mutate_editPost: mutate,
		setIsRequestReady_editPost: setIsRequestReady,
		setPostId_editPost: setPostId,
	}
}
