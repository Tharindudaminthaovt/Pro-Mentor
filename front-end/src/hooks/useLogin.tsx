import { ILogin } from '../pages/login'
import { AuthService } from '../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../services/useCustomSWR'

const api = new AuthService()

export interface KeycloakLoginResponse {
	access_token?: string
	clientData?: {
		exp?: number
		iat?: number
		jti?: string
		iss?: string
		aud?: string[]
		sub?: string
		typ?: string
		azp?: string
		session_state?: string
		name?: string
		given_name?: string
		family_name?: string
		preferred_username?: string
		email?: string
		email_verified?: boolean
		acr?: string
		'allowed-origins'?: string[]
		realm_access?: {
			roles?: string[]
		}
		resource_access?: {
			[key: string]: {
				roles?: string[]
			}
		}
		scope?: string
		sid?: string
		client_id?: string
		username?: string
		active?: boolean
	}
}

export const useLogin = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<ILogin, KeycloakLoginResponse>(api.Post_Login(), 'POST')

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		loginResponse: data,
		setLoginRequest: setRequest,
		error_login: error,
		isLoading_login: isLoading,
		isValidating_login: isValidating,
		mutate_login: mutate,
		setIsRequestReady_login: setIsRequestReady,
	}
}
