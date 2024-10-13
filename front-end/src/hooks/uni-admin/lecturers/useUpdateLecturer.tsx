import { useEffect, useState } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import {
	LecturerUpdateRequest,
	UpdateLecturerResponse,
} from '@promentor-app/shared-lib'

const api = new AuthService()

export const useUpdateLecturer = () => {
	const [lecId, setLecId] = useState<string>('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<LecturerUpdateRequest, UpdateLecturerResponse>(
		api.Patch_Lecturers(lecId),
		'PATCH'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		updateLecturersResponse: data,
		setUpdateLecturersRequest: setRequest,
		error_updateLecturer: error,
		isLoading_updateLecturer: isLoading,
		isValidating_updateLecturer: isValidating,
		mutate_updateLecturer: mutate,
		setIsRequestReady_updateLecturer: setIsRequestReady,
		setLecId,
	}
}
