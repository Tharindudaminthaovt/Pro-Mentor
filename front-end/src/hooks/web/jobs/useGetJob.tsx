import { useCustomSWR } from '../../../services/useCustomSWR'
import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useState } from 'react'
import { GetJobListResponse } from './useGetJobList'

const api = new SocialService()

export const useGetJob = () => {
	const [jobId, setJobId] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetJobListResponse
	>(jobId ? api.Get_Job(jobId) : null, 'GET')

	return {
		getJobResponse: data,
		error_getJob: error,
		isLoading_getJob: isLoading,
		isValidating_getJob: isValidating,
		mutate_getJob: customMutate,
		setJobId_getJob: setJobId,
	}
}
