import { useState } from 'react'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export const usePostLike = () => {
	const [postId, setPostId] = useState('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<unknown, any>(
		postId ? api.Put_PostLike(postId) : null,
		'PUT'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		postLikeResponse: data,
		setPostLikeRequest: setRequest,
		error_postLike: error,
		isLoading_postLike: isLoading,
		isValidating_postLike: isValidating,
		mutate_postLike: mutate,
		setIsRequestReady_postLike: setIsRequestReady,
		setPostId_postLike: setPostId,
	}
}
