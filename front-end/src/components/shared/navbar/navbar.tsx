// import Sidebar from 'react-bootstrap-sidebar-menu'
// import { useNavigate } from 'react-router-dom'
// import './navbar.scss'

// // icons
// import navLogo from '@/assets/images/nav-logo.svg'
// import NDashboard from '@/assets/images/nav-dashboard.svg'
// import NStaff from '@/assets/images/nav-staff.svg'
// import NStudents from '@/assets/images/nav-students.svg'
// import NLecturers from '@/assets/images/nav-lecturers.svg'
// import NJobs from '@/assets/images/nav-jobs.svg'
// import NEvents from '@/assets/images/nav-events.svg'
// import NChats from '@/assets/images/nav-chats.svg'
// import NProfile from '@/assets/images/nav-profile.svg'

// import { SessionHandler } from '../../../utils/session-handler'
// import { useContext } from 'react'
// import {
// 	GlobalContext,
// 	GlobalContextType,
// } from '../../../context/global.context'
// // import { keycloakInstant } from '../../../hooks/useAuth'

// type NavItemType = {
// 	id: number
// 	icon?: string
// 	title: string
// 	path: string
// 	subMenu?: NavItemType[]
// }
// const sessionHandler = new SessionHandler()

// const NavbarLocal = () => {
// 	const theme = 'light'
// 	const navigate = useNavigate()
// 	const { loggedInUser } = useContext(GlobalContext) as GlobalContextType

// 	const uniAdminNavList: NavItemType[] = [
// 		{
// 			id: 1,
// 			title: 'Dashboard',
// 			path: '/',
// 		},
// 		{
// 			id: 3,
// 			title: 'Students',
// 			path: '/students',
// 		},
// 		{
// 			id: 4,
// 			title: 'Lecturers',
// 			path: '/lecturers',
// 		},
// 		{
// 			id: 5,
// 			title: 'Events',
// 			path: '/admin-events',
// 		},
// 		{
// 			id: 6,
// 			title: 'Jobs',
// 			path: '/admin-jobs',
// 		},
// 	]

// 	const webNavList: NavItemType[] = [
// 		{
// 			id: 1, // both dashboards
// 			title: 'Dashboard',
// 			path: '/',
// 		},
// 		{
// 			id: 22,
// 			title: 'Jobs',
// 			path: '/jobs',
// 		},
// 		{
// 			id: 33,
// 			title: 'Events',
// 			path: '/events',
// 		},
// 		{
// 			id: 44,
// 			title: 'Chats',
// 			path: '/chats',
// 		},
// 		{
// 			id: 55,
// 			title: 'Profile',
// 			path: '/profile',
// 		},
// 	]

// 	function navIconSetter(id: number) {
// 		switch (id) {
// 			case 1:
// 				return NDashboard
// 			case 2:
// 				return NStaff
// 			case 3:
// 				return NStudents
// 			case 4:
// 				return NLecturers
// 			case 5:
// 				return NEvents
// 			case 6:
// 				return NJobs
// 			case 22:
// 				return NJobs
// 			case 33:
// 				return NEvents
// 			case 44:
// 				return NChats
// 			case 55:
// 				return NProfile
// 			default:
// 				return ''
// 		}
// 	}

// 	function logoutHandler() {
// 		// const { hostname, protocol, port } = window.location
// 		// const hrefWothoutPath =
// 		// 	protocol + '//' + hostname + (port ? ':' + port : '')

// 		sessionHandler.destroySession('token')
// 		sessionHandler.destroySession('user')
// 		sessionHandler.destroySession('isAuthenticated')
// 		navigate('/login')
// 	}

// 	return (
// 		<Sidebar defaultExpanded variant={theme} bg={theme} expand="sm">
// 			<Sidebar.Collapse getScrollValue={500}>
// 				<Sidebar.Header>
// 					<Sidebar.Brand>
// 						<img src={navLogo} alt="logo" className="logo" />
// 					</Sidebar.Brand>
// 					<Sidebar.Toggle />
// 				</Sidebar.Header>

// 				<div className="navbar-container1">
// 					<Sidebar.Body>
// 						{(loggedInUser === 'admin' ||
// 							loggedInUser === 'resources-management') &&
// 							uniAdminNavList.map((item) => {
// 								return (
// 									<Sidebar.Nav
// 										key={item.id}
// 										data-toggle="tooltip"
// 										data-placement="right"
// 										title={item.title}
// 									>
// 										<Sidebar.Nav.Link
// 											eventKey={item.path}
// 											active={item.path === window.location.pathname}
// 											onSelect={() => navigate(item.path)}
// 										>
// 											<Sidebar.Nav.Icon>
// 												<img
// 													className="nav-icon"
// 													src={navIconSetter(item.id)}
// 													alt="icon"
// 												/>
// 											</Sidebar.Nav.Icon>
// 											<Sidebar.Nav.Title>{item.title}</Sidebar.Nav.Title>
// 										</Sidebar.Nav.Link>
// 									</Sidebar.Nav>
// 								)
// 							})}

// 						{loggedInUser === 'admin' && (
// 							<Sidebar.Nav
// 								key={2}
// 								data-toggle="tooltip"
// 								data-placement="right"
// 								title="Staff"
// 							>
// 								<Sidebar.Nav.Link
// 									eventKey="/staff"
// 									active={'/staff' === window.location.pathname}
// 									onSelect={() => navigate('/staff')}
// 								>
// 									<Sidebar.Nav.Icon>
// 										<img
// 											className="nav-icon"
// 											src={navIconSetter(2)}
// 											alt="icon"
// 										/>
// 									</Sidebar.Nav.Icon>
// 									<Sidebar.Nav.Title>Staff</Sidebar.Nav.Title>
// 								</Sidebar.Nav.Link>
// 							</Sidebar.Nav>
// 						)}

// 						{(loggedInUser === 'lecture' ||
// 							loggedInUser === 'student' ||
// 							loggedInUser === 'user') &&
// 							webNavList.map((item) => {
// 								return (
// 									<Sidebar.Nav
// 										key={item.id}
// 										data-toggle="tooltip"
// 										data-placement="right"
// 										title={item.title}
// 									>
// 										<Sidebar.Nav.Link
// 											eventKey={item.path}
// 											active={
// 												item.path !== '/'
// 													? window.location.pathname.includes(item.path)
// 													: window.location.pathname === item.path
// 											}
// 											onSelect={() => navigate(item.path)}
// 										>
// 											<Sidebar.Nav.Icon>
// 												<img
// 													className="nav-icon"
// 													src={navIconSetter(item.id)}
// 													alt="icon"
// 												/>
// 											</Sidebar.Nav.Icon>
// 											<Sidebar.Nav.Title>{item.title}</Sidebar.Nav.Title>
// 										</Sidebar.Nav.Link>
// 									</Sidebar.Nav>
// 								)
// 							})}

// 						{loggedInUser === 'student' && (
// 							<Sidebar.Nav
// 								key={66}
// 								data-toggle="tooltip"
// 								data-placement="right"
// 								title="Career Guide"
// 							>
// 								<Sidebar.Nav.Link
// 									eventKey="/career-guide"
// 									active={'/career-guide' === window.location.pathname}
// 									onSelect={() => navigate('/career-guide')}
// 								>
// 									<Sidebar.Nav.Icon>
// 										<img
// 											className="nav-icon"
// 											src={navIconSetter(22)}
// 											alt="icon"
// 										/>
// 									</Sidebar.Nav.Icon>
// 									<Sidebar.Nav.Title>Career Guide</Sidebar.Nav.Title>
// 								</Sidebar.Nav.Link>
// 							</Sidebar.Nav>
// 						)}
// 					</Sidebar.Body>

// 					<div className="bottom-nav-container">
// 						<Sidebar.Nav
// 							data-toggle="tooltip"
// 							data-placement="right"
// 							title="Logout"
// 						>
// 							<Sidebar.Nav.Link onClick={logoutHandler}>
// 								<Sidebar.Nav.Icon>
// 									<img className="nav-icon" src={NDashboard} alt="icon" />
// 								</Sidebar.Nav.Icon>
// 								<Sidebar.Nav.Title>Logout</Sidebar.Nav.Title>
// 							</Sidebar.Nav.Link>
// 						</Sidebar.Nav>
// 					</div>
// 					<div className="powered-by-title">Powered by ProMentor © 2025</div>
// 				</div>
// 			</Sidebar.Collapse>
// 		</Sidebar>
// 	)
// }

// export default NavbarLocal

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar.scss'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { SessionHandler } from '../../../utils/session-handler'
import { useContext } from 'react'
import {
	GlobalContext,
	GlobalContextType,
} from '../../../context/global.context'

// Icons
import {
	FiHome,
	FiUsers,
	FiUser,
	FiCalendar,
	FiBriefcase,
	FiMessageSquare,
	FiAward,
	FiLogOut,
} from 'react-icons/fi'

type NavItemType = {
	id: number
	icon: JSX.Element
	title: string
	path: string
}

const sessionHandler = new SessionHandler()

const NavbarLocal = ({
	onToggle,
}: {
	onToggle: (collapsed: boolean) => void
}) => {
	const [collapsed, setCollapsed] = useState(true)
	const navigate = useNavigate()
	const { loggedInUser } = useContext(GlobalContext) as GlobalContextType

	const uniAdminNavList: NavItemType[] = [
		{
			id: 1,
			title: 'Dashboard',
			path: '/',
			icon: <FiHome size={20} />,
		},
		{
			id: 3,
			title: 'Students',
			path: '/students',
			icon: <FiUsers size={20} />,
		},
		{
			id: 4,
			title: 'Lecturers',
			path: '/lecturers',
			icon: <FiUser size={20} />,
		},
		{
			id: 5,
			title: 'Events',
			path: '/admin-events',
			icon: <FiCalendar size={20} />,
		},
		{
			id: 6,
			title: 'Jobs',
			path: '/admin-jobs',
			icon: <FiBriefcase size={20} />,
		},
	]

	const webNavList: NavItemType[] = [
		{
			id: 1,
			title: 'Dashboard',
			path: '/',
			icon: <FiHome size={20} />,
		},
		{
			id: 22,
			title: 'Jobs',
			path: '/jobs',
			icon: <FiBriefcase size={20} />,
		},
		{
			id: 33,
			title: 'Events',
			path: '/events',
			icon: <FiCalendar size={20} />,
		},
		{
			id: 44,
			title: 'Chats',
			path: '/chats',
			icon: <FiMessageSquare size={20} />,
		},
		{
			id: 55,
			title: 'Profile',
			path: '/profile',
			icon: <FiUser size={20} />,
		},
	]

	const isActive = (path: string) => {
		return (
			window.location.pathname === path ||
			(path !== '/' && window.location.pathname.startsWith(path))
		)
	}

	function logoutHandler() {
		sessionHandler.destroySession('token')
		sessionHandler.destroySession('user')
		sessionHandler.destroySession('isAuthenticated')
		navigate('/login')
	}

	const toggleSidebar = () => {
		const newCollapsed = !collapsed
		setCollapsed(newCollapsed)
		onToggle(newCollapsed)
	}
	const handleBlur = () => {
		setCollapsed(true)
	}
	return (
		<div
			className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}
			onBlur={handleBlur}
		>
			<div className="sidebar-header">
				{!collapsed && (
					<div className="logo-container">
						<span className="logo-text">ProMentor</span>
					</div>
				)}
				<button className="toggle-btn" onClick={toggleSidebar}>
					{collapsed ? (
						<FiChevronRight size={20} />
					) : (
						<FiChevronLeft size={20} />
					)}
				</button>
			</div>

			<div className="sidebar-content">
				{(loggedInUser === 'admin' ||
					loggedInUser === 'resources-management') && (
					<>
						{uniAdminNavList.map((item) => (
							<div
								key={item.id}
								className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
								onClick={() => navigate(item.path)}
								title={item.title}
							>
								<div className="nav-icon">{item.icon}</div>
								{!collapsed && <span className="nav-title">{item.title}</span>}
							</div>
						))}

						{loggedInUser === 'admin' && (
							<div
								className={`nav-item ${isActive('/staff') ? 'active' : ''}`}
								onClick={() => navigate('/staff')}
								title="Staff"
							>
								<div className="nav-icon">
									<FiUsers size={20} />
								</div>
								{!collapsed && <span className="nav-title">Staff</span>}
							</div>
						)}
					</>
				)}

				{(loggedInUser === 'lecture' ||
					loggedInUser === 'student' ||
					loggedInUser === 'user') && (
					<>
						{webNavList.map((item) => (
							<div
								key={item.id}
								className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
								onClick={() => navigate(item.path)}
								title={item.title}
							>
								<div className="nav-icon">{item.icon}</div>
								{!collapsed && <span className="nav-title">{item.title}</span>}
							</div>
						))}

						{loggedInUser === 'student' && (
							<div
								className={`nav-item ${
									isActive('/career-guide') ? 'active' : ''
								}`}
								onClick={() => navigate('/career-guide')}
								title="Career Guide"
							>
								<div className="nav-icon">
									<FiAward size={20} />
								</div>
								{!collapsed && <span className="nav-title">Career Guide</span>}
							</div>
						)}
					</>
				)}
			</div>

			<div className="sidebar-footer">
				<div className="nav-item" onClick={logoutHandler} title="Logout">
					<div className="nav-icon">
						<FiLogOut size={20} />
					</div>
					{!collapsed && <span className="nav-title">Logout</span>}
				</div>
				{!collapsed && (
					<div className="powered-by">Powered by ProMentor © 2025</div>
				)}
			</div>
		</div>
	)
}

export default NavbarLocal
