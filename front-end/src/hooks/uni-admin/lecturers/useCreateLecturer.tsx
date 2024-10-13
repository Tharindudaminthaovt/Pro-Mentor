import {
	CreateLecturerResponse,
	LecturerCreateRequest,
} from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new AuthService()

export const useCreateLecturer = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<LecturerCreateRequest, CreateLecturerResponse>(
		api.Post_Lecturer(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createLecturerResponse: data,
		setCreateLecturerRequest: setRequest,
		error_createLecturer: error,
		isLoading_createLecturer: isLoading,
		isValidating_createLecturer: isValidating,
		mutate_createLecturer: mutate,
		setIsRequestReady_createLecturer: setIsRequestReady,
	}
}
