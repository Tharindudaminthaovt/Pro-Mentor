import { useState } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { StudentGetByIdResponse } from '@promentor-app/shared-lib'

const api = new AuthService()

export const useGetStudentById = () => {
	const [studentId, setStudentById] = useState<string>('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		customMutate,
		setIsRequestReady,
	} = useCustomSWR<unknown, StudentGetByIdResponse>(
		studentId !== '' ? api.Get_StudentById(studentId) : '',
		'GET_LATER'
	)

	return {
		getStudentByIdResponse: data as StudentGetByIdResponse,
		error_getStudentById: error,
		isLoading_getStudentById: isLoading,
		isValidating_getStudentById: isValidating,
		mutate_getStudentById: customMutate,
		setStudentById,
		setIsRequestReady_getStudentById: setIsRequestReady,
	}
}
