import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import {
	CreateResourceManagerResponse,
	ResourceManagerCreateRequest,
} from '@promentor-app/shared-lib'

const api = new AuthService()

export const useCreateStaff = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<ResourceManagerCreateRequest, CreateResourceManagerResponse>(
		api.Post_Staff(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createStaffResponse: data,
		setCreateStaffRequest: setRequest,
		error_createStaff: error,
		isLoading_createStaff: isLoading,
		isValidating_createStaff: isValidating,
		mutate_createStaff: mutate,
		setIsRequestReady_createStaff: setIsRequestReady,
	}
}
