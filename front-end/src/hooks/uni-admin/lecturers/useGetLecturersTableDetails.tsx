import { GetLecturerResponse } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { useState } from 'react'

const api = new AuthService()

export const useGetLecturersTableDetails = () => {
	const [search, setSearch] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetLecturerResponse[]
	>(
		api.Get_Lecturers({
			search: search,
		}),
		'GET'
	)

	return {
		getLecturersResponse: data,
		error_getLecturers: error,
		isLoading_getLecturers: isLoading,
		isValidating_getLecturers: isValidating,
		mutate_getLecturers: customMutate,
		setSearch_getLecturers: setSearch,
	}
}
