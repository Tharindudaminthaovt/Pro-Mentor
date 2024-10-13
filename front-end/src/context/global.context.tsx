/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { SessionHandler } from '../utils/session-handler'

export type GlobalContextType = {
	loggedInUser: string | null
	setupLoggedInUser: (user: string | null) => void
	token: string | null
	setupToken: (token: string | null) => void
	isAuthenticated: boolean
	setupIsAuthenticated: (status: boolean) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

interface Props {
	children: React.ReactNode
}

const sessionHandler = new SessionHandler()

const setAuthenticatedStatusFromSession = () => {
	const status = sessionHandler.getSession('isAuthenticated')

	if (status === null) {
		return false
	} else if (typeof status == 'string' && status !== '') {
		return Boolean(status)
	} else {
		return false
	}
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState<string | null>(
		sessionHandler.getSession('user')
	)
	const [token, setToken] = useState<string | null>(
		sessionHandler.getSession('token')
	)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		setAuthenticatedStatusFromSession()
	)

	const setupLoggedInUser = (user: string | null) => {
		setLoggedInUser(user)
		sessionHandler.saveSession('user', user as string)
	}

	const setupToken = (token: string | null) => {
		setToken(token)
		sessionHandler.saveSession('token', token as string)
	}

	const setupIsAuthenticated = (status: boolean) => {
		setIsAuthenticated(status)
		sessionHandler.saveSession('isAuthenticated', String(status))
	}

	return (
		<GlobalContext.Provider
			value={{
				loggedInUser,
				setupLoggedInUser,
				token,
				setupToken,
				isAuthenticated,
				setupIsAuthenticated,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
