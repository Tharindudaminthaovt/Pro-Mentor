import Sidebar from 'react-bootstrap-sidebar-menu'
import { useNavigate } from 'react-router-dom'
import './navbar.scss'

// icons
import navLogo from '@/assets/images/nav-logo.svg'
import NDashboard from '@/assets/images/nav-dashboard.svg'
import NStaff from '@/assets/images/nav-staff.svg'
import NStudents from '@/assets/images/nav-students.svg'
import NLecturers from '@/assets/images/nav-lecturers.svg'
import NJobs from '@/assets/images/nav-jobs.svg'
import NEvents from '@/assets/images/nav-events.svg'
import NChats from '@/assets/images/nav-chats.svg'
import NProfile from '@/assets/images/nav-profile.svg'

import { SessionHandler } from '../../../utils/session-handler'
import { useContext } from 'react'
import {
	GlobalContext,
	GlobalContextType,
} from '../../../context/global.context'
// import { keycloakInstant } from '../../../hooks/useAuth'

type NavItemType = {
	id: number
	icon?: string
	title: string
	path: string
	subMenu?: NavItemType[]
}
const sessionHandler = new SessionHandler()

const NavbarLocal = () => {
	const theme = 'light'
	const navigate = useNavigate()
	const { loggedInUser } = useContext(GlobalContext) as GlobalContextType

	const uniAdminNavList: NavItemType[] = [
		{
			id: 1,
			title: 'Dashboard',
			path: '/',
		},
		{
			id: 3,
			title: 'Students',
			path: '/students',
		},
		{
			id: 4,
			title: 'Lecturers',
			path: '/lecturers',
		},
		{
			id: 5,
			title: 'Events',
			path: '/admin-events',
		},
		{
			id: 6,
			title: 'Jobs',
			path: '/admin-jobs',
		},
	]

	const webNavList: NavItemType[] = [
		{
			id: 1, // both dashboards
			title: 'Dashboard',
			path: '/',
		},
		{
			id: 22,
			title: 'Jobs',
			path: '/jobs',
		},
		{
			id: 33,
			title: 'Events',
			path: '/events',
		},
		{
			id: 44,
			title: 'Chats',
			path: '/chats',
		},
		{
			id: 55,
			title: 'Profile',
			path: '/profile',
		},
	]

	function navIconSetter(id: number) {
		switch (id) {
			case 1:
				return NDashboard
			case 2:
				return NStaff
			case 3:
				return NStudents
			case 4:
				return NLecturers
			case 5:
				return NEvents
			case 6:
				return NJobs
			case 22:
				return NJobs
			case 33:
				return NEvents
			case 44:
				return NChats
			case 55:
				return NProfile
			default:
				return ''
		}
	}

	function logoutHandler() {
		// const { hostname, protocol, port } = window.location
		// const hrefWothoutPath =
		// 	protocol + '//' + hostname + (port ? ':' + port : '')

		sessionHandler.destroySession('token')
		sessionHandler.destroySession('user')
		sessionHandler.destroySession('isAuthenticated')
		navigate('/login')
	}

	return (
		<Sidebar defaultExpanded variant={theme} bg={theme} expand="sm">
			<Sidebar.Collapse getScrollValue={500}>
				<Sidebar.Header>
					<Sidebar.Brand>
						<img src={navLogo} alt="logo" className="logo" />
					</Sidebar.Brand>
					<Sidebar.Toggle />
				</Sidebar.Header>

				<div className="navbar-container1">
					<Sidebar.Body>
						{(loggedInUser === 'admin' ||
							loggedInUser === 'resources-management') &&
							uniAdminNavList.map((item) => {
								return (
									<Sidebar.Nav
										key={item.id}
										data-toggle="tooltip"
										data-placement="right"
										title={item.title}
									>
										<Sidebar.Nav.Link
											eventKey={item.path}
											active={item.path === window.location.pathname}
											onSelect={() => navigate(item.path)}
										>
											<Sidebar.Nav.Icon>
												<img
													className="nav-icon"
													src={navIconSetter(item.id)}
													alt="icon"
												/>
											</Sidebar.Nav.Icon>
											<Sidebar.Nav.Title>{item.title}</Sidebar.Nav.Title>
										</Sidebar.Nav.Link>
									</Sidebar.Nav>
								)
							})}

						{loggedInUser === 'admin' && (
							<Sidebar.Nav
								key={2}
								data-toggle="tooltip"
								data-placement="right"
								title="Staff"
							>
								<Sidebar.Nav.Link
									eventKey="/staff"
									active={'/staff' === window.location.pathname}
									onSelect={() => navigate('/staff')}
								>
									<Sidebar.Nav.Icon>
										<img
											className="nav-icon"
											src={navIconSetter(2)}
											alt="icon"
										/>
									</Sidebar.Nav.Icon>
									<Sidebar.Nav.Title>Staff</Sidebar.Nav.Title>
								</Sidebar.Nav.Link>
							</Sidebar.Nav>
						)}

						{(loggedInUser === 'lecture' ||
							loggedInUser === 'student' ||
							loggedInUser === 'user') &&
							webNavList.map((item) => {
								return (
									<Sidebar.Nav
										key={item.id}
										data-toggle="tooltip"
										data-placement="right"
										title={item.title}
									>
										<Sidebar.Nav.Link
											eventKey={item.path}
											active={
												item.path !== '/'
													? window.location.pathname.includes(item.path)
													: window.location.pathname === item.path
											}
											onSelect={() => navigate(item.path)}
										>
											<Sidebar.Nav.Icon>
												<img
													className="nav-icon"
													src={navIconSetter(item.id)}
													alt="icon"
												/>
											</Sidebar.Nav.Icon>
											<Sidebar.Nav.Title>{item.title}</Sidebar.Nav.Title>
										</Sidebar.Nav.Link>
									</Sidebar.Nav>
								)
							})}

						{loggedInUser === 'student' && (
							<Sidebar.Nav
								key={66}
								data-toggle="tooltip"
								data-placement="right"
								title="Career Guide"
							>
								<Sidebar.Nav.Link
									eventKey="/career-guide"
									active={'/career-guide' === window.location.pathname}
									onSelect={() => navigate('/career-guide')}
								>
									<Sidebar.Nav.Icon>
										<img
											className="nav-icon"
											src={navIconSetter(22)}
											alt="icon"
										/>
									</Sidebar.Nav.Icon>
									<Sidebar.Nav.Title>Career Guide</Sidebar.Nav.Title>
								</Sidebar.Nav.Link>
							</Sidebar.Nav>
						)}
					</Sidebar.Body>

					<div className="bottom-nav-container">
						<Sidebar.Nav
							data-toggle="tooltip"
							data-placement="right"
							title="Logout"
						>
							<Sidebar.Nav.Link onClick={logoutHandler}>
								<Sidebar.Nav.Icon>
									<img className="nav-icon" src={NDashboard} alt="icon" />
								</Sidebar.Nav.Icon>
								<Sidebar.Nav.Title>Logout</Sidebar.Nav.Title>
							</Sidebar.Nav.Link>
						</Sidebar.Nav>
					</div>
					<div className="powered-by-title">Powered by ProMentor © 2025</div>
				</div>
			</Sidebar.Collapse>
		</Sidebar>
	)
}

export default NavbarLocal
