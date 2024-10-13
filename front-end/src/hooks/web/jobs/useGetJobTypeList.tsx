import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'

const api = new SocialService()

export interface GetJobTypeListResponse {
	id: string
	key: string
}

export const useGetJobTypeList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetJobTypeListResponse[]
	>(
		api.Get_JobTypes({
			page: '0',
			size: '0',
		}),
		'GET'
	)

	return {
		getJobTypeListResponse: data,
		error_getJobType: error,
		isLoading_getJobType: isLoading,
		isValidating_getJobType: isValidating,
		mutate_getJobType: customMutate,
	}
}
