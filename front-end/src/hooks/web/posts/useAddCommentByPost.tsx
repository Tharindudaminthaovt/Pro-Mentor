import { useState } from 'react'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export type AddCommentRequest = {
	comment: string
}

export const useAddCommentByPost = () => {
	const [postId, setPostId] = useState('')

	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<AddCommentRequest, any>(
		postId ? api.Post_AddComment(postId) : null,
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		AddCommentResponse: data,
		setAddCommentRequest: setRequest,
		error_AddComment: error,
		isLoading_AddComment: isLoading,
		isValidating_AddComment: isValidating,
		mutate_AddComment: mutate,
		setIsRequestReady_AddComment: setIsRequestReady,
		setPostId_AddComment: setPostId,
	}
}
