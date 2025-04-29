import React, { useContext } from 'react'
import '@/assets/styles/App.scss'
import { Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'
import { Spinner } from 'react-bootstrap'
import UniAdminDashboard from './pages/uni-admin/dashboard/uni-admin-dashboard'
import UniStaff from './pages/uni-admin/staff/uni-staff'
import Lecturers from './pages/uni-admin/lecturers/lecturers'
import Students from './pages/uni-admin/students/students'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/login'
import { GlobalContext, GlobalContextType } from './context/global.context'
import WebDashboard from './pages/web/web-dashboard/web-dashboard'
import WebEvents from './pages/web/web-events/web-events'
import Jobs from './pages/web/jobs/jobs'
import Chats from './pages/web/chats/chats'
import Profile from './pages/web/profile/profile'
import CareerGuide from './pages/web/career-guide/career-guide'
import CreatePost from './pages/web/posts/create-post/create-post'
import CreateJob from './pages/web/jobs/create-job/create-job'
import CreateEvent from './pages/web/web-events/create-event/create-event'
import 'react-datepicker/dist/react-datepicker.css'
import AdminEvents from './pages/uni-admin/admin-events/admin-events'
import AdminJobs from './pages/uni-admin/admin-jobs/admin-jobs'

document.title = 'ProMentor'

function App() {
	const { loggedInUser, isAuthenticated } = useContext(
		GlobalContext
	) as GlobalContextType

	return (
		<React.Suspense
			fallback={
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}
		>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				closeOnClick
				pauseOnFocusLoss={false}
				pauseOnHover={false}
			/>
			<Routes>
				<Route path="/login" element={<Login />} />

				{isAuthenticated && (
					<Route element={<AuthGuard />}>
						{(loggedInUser === 'admin' ||
							loggedInUser === 'resources-management') && (
							<>
								<Route path="/" element={<UniAdminDashboard />} />
								<Route path="/students" element={<Students />} />
								<Route path="/lecturers" element={<Lecturers />} />
								<Route path="/admin-events" element={<AdminEvents />} />
								<Route path="/admin-jobs" element={<AdminJobs />} />
							</>
						)}

						{loggedInUser === 'admin' && (
							<>
								<Route path="/staff" element={<UniStaff />} />
							</>
						)}

						{(loggedInUser === 'student' ||
							loggedInUser === 'lecture' ||
							loggedInUser === 'user') && (
							<>
								<Route path="/" element={<WebDashboard />} />
								<Route path="/jobs" element={<Jobs />} />
								<Route path="/jobs/:jobId" element={<Jobs />} />
								<Route path="/events" element={<WebEvents />} />
								<Route path="/events/:eventId" element={<WebEvents />} />
								<Route path="/chats" element={<Chats />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/create-post" element={<CreatePost />} />
								<Route path="/edit-post/:postId" element={<CreatePost />} />
								<Route path="/create-event" element={<CreateEvent />} />
							</>
						)}

						{(loggedInUser === 'lecture' || loggedInUser === 'user') && (
							<>
								<Route path="/create-job" element={<CreateJob />} />
								<Route path="/edit-job/:jobId" element={<CreateJob />} />
							</>
						)}

						{loggedInUser === 'student' && (
							<>
								<Route path="/career-guide" element={<CareerGuide />} />
							</>
						)}
					</Route>
				)}

				{/* if user is not logged-in, redirect all the paths to login page */}
				{!isAuthenticated && <Route path="*" element={<Login />} />}
			</Routes>
		</React.Suspense>
	)
}

export default App
