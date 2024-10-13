import { useState } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { ResourceManagerGetByIdResponse } from '@promentor-app/shared-lib'

const api = new AuthService()

export const useGetStaffById = () => {
	const [staffId, setStaffById] = useState<string>('')
	const {
		data,
		error,
		isLoading,
		isValidating,
		customMutate,
		setIsRequestReady,
	} = useCustomSWR<unknown, ResourceManagerGetByIdResponse>(
		staffId !== '' ? api.Get_StaffById(staffId) : '',
		'GET_LATER'
	)

	return {
		getStaffByIdResponse: data as ResourceManagerGetByIdResponse,
		error_getStaffById: error,
		isLoading_getStaffById: isLoading,
		isValidating_getStaffById: isValidating,
		mutate_getStaffById: customMutate,
		setStaffById,
		setIsRequestReady_getStaffById: setIsRequestReady,
	}
}
