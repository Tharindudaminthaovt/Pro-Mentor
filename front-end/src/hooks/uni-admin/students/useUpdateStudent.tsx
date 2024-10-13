import { useEffect, useState } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import {
	StudentUpdateRequest,
	UpdateStudentResponse,
} from '@promentor-app/shared-lib'

const api = new AuthService()

export const useUpdateStudent = () => {
	const [studentId, setStudentId] = useState<string>('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<StudentUpdateRequest, UpdateStudentResponse>(
		api.Patch_Students(studentId),
		'PATCH'
	)

	useEffect(() => {
		// 	console.log(data)
	}, [data])

	return {
		updateStudentsResponse: data,
		setUpdateStudentsRequest: setRequest,
		error_updateStudent: error,
		isLoading_updateStudent: isLoading,
		isValidating_updateStudent: isValidating,
		mutate_updateStudent: mutate,
		setIsRequestReady_updateStudent: setIsRequestReady,
		setStudentId,
	}
}
