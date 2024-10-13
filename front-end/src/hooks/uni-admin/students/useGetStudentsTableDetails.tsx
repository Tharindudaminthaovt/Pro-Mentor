import { GetStudentsResponse } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { useState } from 'react'

const api = new AuthService()

export const useGetStudentsTableDetails = () => {
	const [search, setSearch] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetStudentsResponse[]
	>(
		api.Get_Students({
			search: search,
		}),
		'GET'
	)

	return {
		getStudentsResponse: data,
		error_getStudents: error,
		isLoading_getStudents: isLoading,
		isValidating_getStudents: isValidating,
		mutate_getStudents: customMutate,
		setSearch_getStudents: setSearch,
	}
}
