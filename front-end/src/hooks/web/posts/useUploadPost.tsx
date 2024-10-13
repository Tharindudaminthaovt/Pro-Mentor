import { CDNService } from '../../../services/api/cdn-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new CDNService()

export type UploadPostResponse = {
	path: string
}

export const useUploadPost = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<FormData, UploadPostResponse>(api.Post_UploadPost(), 'POST')

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		uploadPostResponse: data,
		setUploadPostRequest: setRequest,
		error_uploadPost: error,
		isLoading_uploadPost: isLoading,
		isValidating_uploadPost: isValidating,
		mutate_uploadPost: mutate,
		setIsRequestReady_uploadPost: setIsRequestReady,
	}
}
