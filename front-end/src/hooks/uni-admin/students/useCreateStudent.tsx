import {
	CreateStudentResponse,
	StudentCreateRequest,
} from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new AuthService()

export const useCreateStudent = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<StudentCreateRequest, CreateStudentResponse>(
		api.Post_Student(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		createStudentResponse: data,
		setCreateStudentRequest: setRequest,
		error_createStudent: error,
		isLoading_createStudent: isLoading,
		isValidating_createStudent: isValidating,
		mutate_createStudent: mutate,
		setIsRequestReady_createStudent: setIsRequestReady,
	}
}
