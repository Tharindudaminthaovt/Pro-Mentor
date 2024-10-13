import { SocialService } from '../../../services/api/social-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetModeListResponse } from './useGetModeList'

const api = new SocialService()

export type CreateModeRequest = {
	key: string
}

export const useCreateMode = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<CreateModeRequest, GetModeListResponse>(
		api.Post_Mode(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createModeResponse: data,
		setCreateModeRequest: setRequest,
		error_createMode: error,
		isLoading_createMode: isLoading,
		isValidating_createMode: isValidating,
		mutate_createMode: mutate,
		setIsRequestReady_createMode: setIsRequestReady,
	}
}
