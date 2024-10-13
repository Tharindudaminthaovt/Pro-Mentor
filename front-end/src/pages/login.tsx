/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	Button,
	Col,
	Container,
	Form,
	Modal,
	Row,
	Spinner,
} from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import { SessionHandler } from '../utils/session-handler'
import { useNavigate } from 'react-router-dom'
import { GlobalContext, GlobalContextType } from '../context/global.context'
import { errorDisplayHandler } from '../utils/errorDisplayHandler'
import './login.scss'
import logo from '@/assets/images/nav-logo.svg'

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
		// console.log(data)
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
			// console.log(loginResponse)
			// sessionHandler.saveSession('token', loginResponse.access_token as string)

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

			console.log(loginResponse?.clientData)

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

	return (
		<>
			<Container>
				<Row className="justify-content-md-center mt-5">
					<div className="login-logo">
						<img src={logo} alt="logo" />
					</div>
					<Col xs={12} md={6}>
						<h2 className="text-center">Login to your account</h2>
						<Form onSubmit={handleSubmit(onSubmit)} className="login-form">
							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Controller
									name="username"
									control={control}
									defaultValue=""
									render={({ field }) => (
										<Form.Control
											{...field}
											type="text"
											placeholder="Enter username"
											autoComplete="username"
										/>
									)}
								/>
								<Form.Text className="text-danger">
									{errors.username?.message}
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="password" className="pswd">
								<Form.Label>Password</Form.Label>
								<Controller
									name="password"
									control={control}
									defaultValue=""
									render={({ field }) => (
										<Form.Control
											{...field}
											type="password"
											placeholder="Enter password"
											autoComplete="current-password"
										/>
									)}
								/>
								<Form.Text className="text-danger">
									{errors.password?.message}
								</Form.Text>
							</Form.Group>

							<div className="btn-cont">
								<Button variant="primary" type="submit" className="login-btn">
									Login
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
					{/* <p>{loaderMsg}</p> */}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default LoginComponent