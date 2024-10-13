import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useEffect, useState } from 'react'

const api = new SocialService()

export type CommentResponse = {
	postId: string
	id: string
	comment: string
	createdAt: string
	updatedAt: string
	username: string
	firstName?: string
	lastName?: string
}
export const useGetComments = () => {
	const [postId, setPostId] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		CommentResponse[]
	>(
		postId
			? api.Get_Comments(postId, {
					page: '0',
					size: '1000',
				})
			: null,
		'GET'
	)

	useEffect(() => {
		// console.log(postId)
	}, [postId])

	return {
		getCommentsResponse: data,
		error_getComments: error,
		isLoading_getComments: isLoading,
		isValidating_getComments: isValidating,
		mutate_getComments: customMutate,
		setPostId_getComments: setPostId,
	}
}
