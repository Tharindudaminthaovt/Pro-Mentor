import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetJobTypeListResponse } from './useGetJobTypeList'

const api = new SocialService()

export type CreateJobTypeRequest = {
	key: string
}

export const useCreateJobType = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateJobTypeRequest, GetJobTypeListResponse>(
		api.Post_JobType(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createJobTypeResponse: data,
		setCreateJobTypeRequest: setRequest,
		error_createJobType: error,
		isLoading_createJobType: isLoading,
		isValidating_createJobType: isValidating,
		mutate_createJobType: mutate,
		setIsRequestReady_createJobType: setIsRequestReady,
	}
}
