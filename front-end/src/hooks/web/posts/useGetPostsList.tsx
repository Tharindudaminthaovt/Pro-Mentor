import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface Owner {
	id: string
	username: string
	email: string
	firstName: string
	lastName: string
	tenantId: string
}

export interface GetPostsListResponse {
	id: string
	description: string
	imageUrl: string
	createdAt: string
	updatedAt: string
	createdBy: string
	createdById: string
	owner: Owner
	likedByMe: boolean
	numberOfLikes: number
}

export const useGetPostsList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetPostsListResponse[]
	>(
		api.Get_Posts({
			page: '0',
			size: '1000',
		}),
		'GET'
	)

	return {
		getPostsListResponse: data,
		error_getPostsList: error,
		isLoading_getPostsList: isLoading,
		isValidating_getPostsList: isValidating,
		mutate_getPostsList: customMutate,
	}
}
