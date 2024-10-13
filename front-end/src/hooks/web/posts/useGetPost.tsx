import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { GetPostsListResponse } from './useGetPostsList'
import { useState } from 'react'

const api = new SocialService()

export const useGetPost = () => {
	const [postId, setPostId] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetPostsListResponse
	>(postId ? api.Get_Post(postId) : null, 'GET')

	return {
		getPostResponse: data,
		error_getPost: error,
		isLoading_getPost: isLoading,
		isValidating_getPost: isValidating,
		mutate_getPost: customMutate,
		setPostId_getPost: setPostId,
	}
}
