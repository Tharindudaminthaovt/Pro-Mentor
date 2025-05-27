/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import { SessionHandler } from '../utils/session-handler'
import { useNavigate } from 'react-router-dom'
import { GlobalContext, GlobalContextType } from '../context/global.context'
import { errorDisplayHandler } from '../utils/errorDisplayHandler'
import logo from '@/assets/images/nav-logo.svg'
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi'

// Define validation schema
const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
})

export interface ILogin {
	username: string
	password: string
}

const sessionHandler = new SessionHandler()

const LoginComponent = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const { setupLoggedInUser, setupToken, setupIsAuthenticated } = useContext(
		GlobalContext
	) as GlobalContextType
	const [isLoading, setIsLoading] = useState(false)
	const [usernameOrEmail, setUsernameOrEmail] = useState('')
	const {
		setLoginRequest,
		loginResponse,
		isLoading_login,
		isValidating_login,
		error_login,
		setIsRequestReady_login,
		mutate_login,
	} = useLogin()
	const navigate = useNavigate()

	const onSubmit = (data: ILogin) => {
		setUsernameOrEmail(data.username)
		setLoginRequest(data)
		setIsRequestReady_login(true)
		mutate_login()
	}

	useEffect(() => {
		if (sessionHandler.getSession('token') !== null) {
			navigate('/')
		}
	})

	useEffect(() => {
		if (loginResponse) {
			const userRole =
				loginResponse?.clientData?.realm_access?.roles &&
				loginResponse?.clientData?.realm_access?.roles.find(
					(role: string) =>
						role === 'admin' ||
						role === 'resources-management' ||
						role === 'lecture' ||
						role === 'student' ||
						role === 'user'
				)

			setupLoggedInUser(userRole || null)
			setupToken(loginResponse?.access_token || null)
			setupIsAuthenticated(true)

			sessionHandler.saveSession('usernameOrEmail', usernameOrEmail)
			sessionHandler.saveSession(
				'username',
				loginResponse?.clientData?.username || usernameOrEmail
			)
			sessionHandler.saveSession(
				'name',
				loginResponse?.clientData?.name || usernameOrEmail
			)
			sessionHandler.saveSession(
				'email',
				loginResponse?.clientData?.email || 'abc@gmail.com'
			)
			sessionHandler.saveSession(
				'email_verified',
				loginResponse?.clientData?.email || String(false)
			)
			navigate('/')
		}
	}, [loginResponse])

	useEffect(() => {
		if (isLoading_login || isValidating_login) setIsLoading(true)
		else setIsLoading(false)
	}, [isLoading_login, isValidating_login])

	useEffect(() => {
		errorDisplayHandler(error_login)
	}, [error_login])

	// Inline styles
	const styles = {
		loginContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '100vh',
			backgroundColor: '#f8f9fa',
			padding: '24px',
		},
		loginCard: {
			background: 'white',
			borderRadius: '16px',
			padding: '40px',
			width: '100%',
			maxWidth: '480px',
			boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
		},
		logoContainer: {
			textAlign: 'center' as const,
			marginBottom: '32px',
		},
		logo: {
			height: '60px',
		},
		title: {
			fontSize: '24px',
			fontWeight: 600,
			color: '#111827',
			textAlign: 'center' as const,
			marginBottom: '8px',
		},
		subtitle: {
			fontSize: '14px',
			color: '#6b7280',
			textAlign: 'center' as const,
			marginBottom: '32px',
		},
		formGroup: {
			marginBottom: '24px',
		},
		label: {
			display: 'block',
			fontSize: '14px',
			fontWeight: 500,
			color: '#374151',
			marginBottom: '8px',
		},
		inputContainer: {
			position: 'relative' as const,
		},
		inputIcon: {
			position: 'absolute' as const,
			top: '12px',
			left: '12px',
			color: '#9ca3af',
		},
		input: {
			width: '100%',
			padding: '12px 12px 12px 40px',
			borderRadius: '8px',
			border: '1px solid #d1d5db',
			fontSize: '14px',
			transition: 'border-color 0.2s',
		},
		inputFocus: {
			outline: 'none',
			borderColor: '#3b82f6',
			boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
		},
		errorText: {
			fontSize: '12px',
			color: '#ef4444',
			marginTop: '4px',
		},
		loginButton: {
			width: '100%',
			padding: '12px',
			backgroundColor: '#3b82f6',
			border: 'none',
			borderRadius: '8px',
			fontSize: '16px',
			fontWeight: 500,
			color: 'white',
			cursor: 'pointer',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '8px',
			transition: 'background-color 0.2s',
		},
		loginButtonHover: {
			backgroundColor: '#2563eb',
		},
		loadingModal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		loadingContent: {
			background: 'rgba(255, 255, 255, 0.9)',
			border: 'none',
			padding: '32px',
			borderRadius: '12px',
			textAlign: 'center' as const,
		},
		loadingText: {
			marginTop: '16px',
			color: '#111827',
			fontWeight: 500,
		},
	}

	return (
		<div style={styles.loginContainer}>
			<div style={styles.loginCard}>
				<div style={styles.logoContainer}>
					<img src={logo} alt="logo" style={styles.logo} />
				</div>

				<h2 style={styles.title}>Welcome back</h2>
				<p style={styles.subtitle}>Sign in to your account to continue</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div style={styles.formGroup}>
						<label style={styles.label}>Username</label>
						<div style={styles.inputContainer}>
							<FiUser style={styles.inputIcon} />
							<Controller
								name="username"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<input
										{...field}
										type="text"
										placeholder="Enter your username"
										autoComplete="username"
										style={{
											...styles.input,
											...(errors.username ? { borderColor: '#ef4444' } : {}),
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '#3b82f6'
											e.target.style.boxShadow =
												'0 0 0 3px rgba(59, 130, 246, 0.1)'
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#d1d5db'
											e.target.style.boxShadow = 'none'
										}}
									/>
								)}
							/>
						</div>
						{errors.username && (
							<span style={styles.errorText}>{errors.username.message}</span>
						)}
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Password</label>
						<div style={styles.inputContainer}>
							<FiLock style={styles.inputIcon} />
							<Controller
								name="password"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<input
										{...field}
										type="password"
										placeholder="Enter your password"
										autoComplete="current-password"
										style={{
											...styles.input,
											...(errors.password ? { borderColor: '#ef4444' } : {}),
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '#3b82f6'
											e.target.style.boxShadow =
												'0 0 0 3px rgba(59, 130, 246, 0.1)'
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#d1d5db'
											e.target.style.boxShadow = 'none'
										}}
									/>
								)}
							/>
						</div>
						{errors.password && (
							<span style={styles.errorText}>{errors.password.message}</span>
						)}
					</div>

					<button
						type="submit"
						style={styles.loginButton}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = '#2563eb'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = '#3b82f6'
						}}
						disabled={isLoading}
					>
						{isLoading ? (
							<Spinner animation="border" size="sm" />
						) : (
							<>
								<FiLogIn /> Sign In
							</>
						)}
					</button>
				</form>
			</div>

			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={styles.loadingModal}
			>
				<Modal.Body style={styles.loadingContent}>
					<Spinner animation="border" variant="primary" />
					<p style={styles.loadingText}>Signing you in...</p>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LoginComponent
