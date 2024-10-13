import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new SocialService()

export type CreateJobRequest = {
	title: string
	description: string
	companyName: string
	typeId: string
	locationId: string
	modalityId: string
	tags: { id: string; key: string }[]
}

export const useCreateJob = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateJobRequest, any>(api.Post_CreateJob(), 'POST')

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createJobResponse: data,
		setCreateJobRequest: setRequest,
		error_createJob: error,
		isLoading_createJob: isLoading,
		isValidating_createJob: isValidating,
		mutate_createJob: mutate,
		setIsRequestReady_createJob: setIsRequestReady,
	}
}
