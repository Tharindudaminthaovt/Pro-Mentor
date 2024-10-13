import { IGlobalError } from '../services/useCustomSWR'

// Type guard function to check if an object conforms to the IGlobalError interface
export function isIGlobalError(obj: any): obj is IGlobalError {
	return (
		typeof obj === 'object' &&
		Array.isArray(obj.errors) &&
		obj.errors.every(
			(error: any) =>
				typeof error.message === 'string' &&
				(typeof error.field === 'undefined' || typeof error.field === 'string')
		) &&
		typeof obj.errorCode === 'number'
	)
}
