import { toast } from 'react-toastify'
import { IGlobalError } from '../services/useCustomSWR'

export function errorDisplayHandler(error: string | IGlobalError | null) {
	if (error !== undefined && error !== null) {
		if (typeof error !== 'string') {
			if (error?.errors) toast.error(error.errors[0].message)
			else if (error?.message) toast.error(error?.message)
		} else {
			toast.error(error)
		}
	}
}
