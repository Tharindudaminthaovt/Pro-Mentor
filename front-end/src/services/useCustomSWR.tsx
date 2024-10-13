import { useEffect, useState } from 'react'
import {
	DeleteRequestHandler,
	GetRequestHandler,
	PatchRequestHandler,
	PostRequestHandler,
	PutRequestHandler,
} from './client'
import useSWR from 'swr'
import { ErrorCode } from '@promentor-app/shared-lib'

export interface IGlobalError {
	errors?: ErrorObj[]
	errorCode?: ErrorCode
	message?: string
}

export interface ErrorObj {
	message: string
	field?: string
}

export function useCustomSWR<RequestType, ResponseType>(
	endpoint: string | null,
	requestType:
		| 'GET'
		| 'GET_LATER'
		| 'PUT'
		| 'DELETE'
		| 'PATCH'
		| 'POST' = 'GET',
	revalidateOnFocus: boolean = false,
	revalidateIfStale: boolean = false
) {
	const [isRequestReady, setIsRequestReady] = useState(
		requestType === 'GET' ? true : false
	)
	const [request, setRequest] = useState<RequestType | null>(null)
	const [response, setResponse] = useState<ResponseType>()
	const [globalError, setGlobalError] = useState<IGlobalError | string | null>(
		null
	)

	useEffect(() => {
		if (request) setIsRequestReady(true)
	}, [request])

	const fetcherDefault = async () => {
		// setIsRequestReady(false)

		try {
			let res: ResponseType
			if (endpoint !== null) {
				switch (requestType) {
					case 'GET':
						res = await GetRequestHandler<ResponseType>(endpoint)
						break
					case 'GET_LATER':
						res = await GetRequestHandler<ResponseType>(endpoint)
						break
					case 'PUT':
						res = await PutRequestHandler<RequestType, ResponseType>(
							request,
							endpoint
						)
						break
					case 'DELETE':
						res = await DeleteRequestHandler<RequestType, ResponseType>(
							request,
							endpoint
						)
						break
					case 'PATCH':
						res = await PatchRequestHandler<RequestType, ResponseType>(
							request,
							endpoint
						)
						break
					case 'POST':
						res = await PostRequestHandler<RequestType, ResponseType>(
							request,
							endpoint
						)
						break
				}

				setResponse(res)
				setIsRequestReady(false)
				setRequest(null)
				return res
			}
		} catch (e: any) {
			// console.log(e)
			setIsRequestReady(false)
			setRequest(null)
			setGlobalError(e as IGlobalError)
		}
	}

	const { isLoading, error, mutate, isValidating } = useSWR(
		isRequestReady ? endpoint : null,
		fetcherDefault,
		{
			revalidateOnFocus: revalidateOnFocus,
			revalidateIfStale: revalidateIfStale,
		}
	)

	useEffect(() => {
		// console.log(error)

		if (error !== undefined && error !== null) {
			setGlobalError(error as string)
		}
	}, [error])

	useEffect(() => {
		// console.log(isRequestReady)
	}, [isRequestReady])

	return {
		data: response,
		isLoading,
		isValidating,
		error: globalError,
		mutate,
		setRequest,
		setIsRequestReady,
		customMutate: fetcherDefault,
	}
}
