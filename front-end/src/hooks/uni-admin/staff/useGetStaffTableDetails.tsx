import { useEffect, useState } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetResourceManagersResponse } from '@promentor-app/shared-lib'

const api = new AuthService()

export const useGetStaffTableDetails = () => {
	const [search, setSearch] = useState('')
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetResourceManagersResponse[]
	>(
		api.Get_Staff({
			search: search,
		}),
		'GET'
	)

	useEffect(() => {
		// console.log(data)
	}, [data])

	return {
		getStaffResponse: data,
		error_getStaff: error,
		isLoading_getStaff: isLoading,
		isValidating_getStaff: isValidating,
		mutate_getStaff: customMutate,
		setSearch_getStaff: setSearch,
	}
}
