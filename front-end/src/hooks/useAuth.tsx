/* eslint-disable react-hooks/exhaustive-deps */
// import Keycloak from 'keycloak-js'
import { useContext, useEffect, useRef } from 'react'
// import {
// 	AuthenticationConfig,
// 	getAuthenticationConfig,
// } from '../utils/getAuthenticationConfig'
import { GlobalContext, GlobalContextType } from '../context/global.context'
// import Login from '../pages/login'
import { useNavigate } from 'react-router-dom'

// const { hostname, protocol } = window.location

// const config: AuthenticationConfig = getAuthenticationConfig(hostname, protocol)

// export const keycloakInstant = new Keycloak({
// 	realm: config.realm,
// 	url: config.idpUrl,
// 	clientId: config.clientId,
// })

const useAuth = () => {
	// const [isAuthenticated, setIsAuthenticated] = useState(false)
	const isRun = useRef(false)
	const navigate = useNavigate()

	const { loggedInUser, setupLoggedInUser, setupToken, isAuthenticated } =
		useContext(GlobalContext) as GlobalContextType

	useEffect(() => {
		if (isRun.current) return
		isRun.current = true

		if (!isAuthenticated) {
			// Redirect to the Login component with state
			navigate('/login')
		} else {
			window.location.href = '/'
		}
		// keycloakInstant
		// 	?.init({
		// 		onLoad: 'login-required',
		// 		checkLoginIframe: false,
		// 	})
		// 	.then((authenticated: boolean) => {
		// 		console.log(authenticated, keycloakInstant)
		// 		console.log(keycloakInstant?.realmAccess?.roles)
		// 		console.log(keycloakInstant?.token)

		// 		const userRole = keycloakInstant?.realmAccess?.roles.find(
		// 			(role) =>
		// 				role === 'admin' ||
		// 				role === 'resources-management' ||
		// 				role === 'lecture' ||
		// 				role === 'student' ||
		// 				role === 'user'
		// 		)

		// 		setupLoggedInUser(userRole || null)
		// 		setupToken(keycloakInstant?.token || null)
		// 		setIsAuthenticated(authenticated)
		// 		// setInterval(() => {
		// 		// 	setIsAuthenticated(authenticated)
		// 		// }, 5000)
		// 	})
		// .catch((err: Error) => {
		// 	console.log(err)
		// })

		// set timer to check token expiration
		const tokenCheckInterval = setInterval(() => {
			// if (keycloakInstant!.isTokenExpired()) {
			// 	// redirect to login page
			// 	const { hostname, protocol, port } = window.location
			// 	const hrefWithoutPath = `${protocol}//${hostname}${
			// 		port ? `:${port}` : ''
			// 	}`
			// 	keycloakInstant!.logout({ redirectUri: hrefWithoutPath })
			// 	// You might want to use 'navigate' from 'react-router-dom' to navigate to the login page
			// 	// navigate('/login');
			// }
		}, 300000) // check every 5 minutes

		// clean up the resources with unmount
		return () => {
			clearInterval(tokenCheckInterval)
		}
	}, [setupLoggedInUser, setupToken])

	return { isAuthenticated, loggedInUser }
}

export default useAuth
