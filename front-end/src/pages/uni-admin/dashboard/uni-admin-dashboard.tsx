import { useEffect, useState } from 'react'
import CountsDisplayWidgets, {
	SummeryCounts,
} from '../../../components/uni-admin/dashboard/counts-display-widgets/counts-display-widgets'
import EventsCalendar, {
	EventItem,
} from '../../../components/uni-admin/dashboard/events-calendar/events-calendar'
import EventsChart from '../../../components/uni-admin/dashboard/events-chart/events-chart'
import JobPostsChart, {
	JobPostChatDate,
} from '../../../components/uni-admin/dashboard/job-posts-chart/job-posts-chart'
import {
	EventsResponse,
	useGetSocialSummery,
} from '../../../hooks/uni-admin/dashboard/useGetSocialSummery'
import IEvents from '@/assets/images/events.svg'
import Iadmins from '@/assets/images/nav-admin.svg'
import Istudents from '@/assets/images/nav-students.svg'
import ILecturers from '@/assets/images/nav-lecturers.svg'
import IStaff from '@/assets/images/nav-staff.svg'
import { DateTimeToOnlyDateMonth } from '../../../utils/dateTImeHandler'
import { useGetAuthSummery } from '../../../hooks/uni-admin/dashboard/useGetAuthSummery'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { Modal, Spinner } from 'react-bootstrap'
import { FiCalendar, FiTrendingUp, FiUsers, FiBarChart2 } from 'react-icons/fi'

const UniAdminDashboard = () => {
	const [jobPostChatDate, setJobPostChatData] = useState<JobPostChatDate[]>([])
	const [events, setEvents] = useState<EventItem[]>([])
	const [countList, setCountList] = useState<SummeryCounts[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const {
		getSocualSummeryResponse,
		isLoading_getSocialSummery,
		isValidating_getSocialSummery,
		mutate_getSocialSummery,
		error_socialSummery,
	} = useGetSocialSummery()

	const {
		getAuthSummeryResponse,
		isValidating_getAuthSummery,
		isLoading_getAuthSummery,
		error_authSummery,
		mutate_getAuthSummery,
	} = useGetAuthSummery()

	const setListCount = (item: SummeryCounts) => {
		const existingItem = countList.find(
			(countItem) => countItem.title === item.title
		)
		if (existingItem) {
			setCountList((prev) => [
				...prev.filter((countItem) => countItem.title !== item.title),
				item,
			])
		} else {
			setCountList((prev) => [...prev, item])
		}
	}

	const setEventsToCalendar = (events: EventsResponse[]) => {
		const convertedList = events.map((item) => ({
			id: item.id,
			title: item.time,
			desc: item.desc,
			start: new Date(item.start),
			end: new Date(item.end),
			time: new Date(item.time),
		}))
		setEvents(convertedList)
	}

	useEffect(() => {
		setCountList([])
		mutate_getAuthSummery()
		mutate_getSocialSummery()
	}, [])

	useEffect(() => {
		let chatData: JobPostChatDate[] = []

		if (getSocualSummeryResponse) {
			const postCounts = getSocualSummeryResponse.postCounts
			const jobCounts = getSocualSummeryResponse.jobCounts

			const dates = jobCounts.map((item) => item.date)
			postCounts.forEach((item) => {
				if (!dates.includes(item.date)) {
					dates.push(item.date)
				}
			})
			dates.sort()

			chatData = dates.map((date) => {
				const post = postCounts.find((post) => post.date === date)
				const job = jobCounts.find((job) => job.date === date)

				return {
					date: DateTimeToOnlyDateMonth(date),
					job: job ? job.count : 0,
					post: post ? post.count : 0,
				} as JobPostChatDate
			})

			setListCount({
				count: getSocualSummeryResponse.eventCount,
				icon: IEvents,
				title: 'Events',
			})

			setEventsToCalendar(getSocualSummeryResponse.events)
		}

		setJobPostChatData(chatData)
	}, [getSocualSummeryResponse])

	useEffect(() => {
		if (getAuthSummeryResponse) {
			if (getAuthSummeryResponse.admin) {
				setListCount({
					count: getAuthSummeryResponse.admin,
					title: 'Admins',
					icon: Iadmins,
				})
			}

			if (getAuthSummeryResponse.lecture) {
				setListCount({
					count: getAuthSummeryResponse.lecture,
					title: 'Lecturers',
					icon: ILecturers,
				})
			}

			if (getAuthSummeryResponse.staff) {
				setListCount({
					count: getAuthSummeryResponse.staff,
					title: 'Staff',
					icon: IStaff,
				})
			}

			if (getAuthSummeryResponse.student) {
				setListCount({
					count: getAuthSummeryResponse.student,
					title: 'Students',
					icon: Istudents,
				})
			}
		}
	}, [getAuthSummeryResponse])

	useEffect(() => {
		errorDisplayHandler(error_authSummery)
		errorDisplayHandler(error_socialSummery)
	}, [error_authSummery, error_socialSummery])

	useEffect(() => {
		if (
			isLoading_getSocialSummery ||
			isValidating_getSocialSummery ||
			isLoading_getAuthSummery ||
			isValidating_getAuthSummery
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_getSocialSummery,
		isValidating_getSocialSummery,
		isLoading_getAuthSummery,
		isValidating_getAuthSummery,
	])

	// Inline styles
	const styles = {
		page: {
			display: 'flex',
			minHeight: '100vh',
			backgroundColor: '#f8f9fa',
			padding: '24px',
		},
		leftContainer: {
			flex: 3,
			marginRight: '24px',
			// marginLeft: '64px',
			display: 'flex',
			flexDirection: 'column' as const,
			gap: '24px',
		},
		rightContainer: {
			flex: 1,
			display: 'flex',
			flexDirection: 'column' as const,
		},
		welcomeContainer: {
			background: 'white',
			borderRadius: '12px',
			padding: '24px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		welcomeText: {
			fontSize: '24px',
			fontWeight: 600,
			color: '#111827',
			marginBottom: '8px',
		},
		welcomeSubtext: {
			fontSize: '16px',
			color: '#6b7280',
			margin: 0,
		},
		chartsContainer: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '24px',
		},
		chartCard: {
			background: 'white',
			borderRadius: '12px',
			padding: '20px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		calendarCard: {
			background: 'white',
			borderRadius: '12px',
			padding: '20px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
			flex: 1,
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
		<div style={styles.page}>
			<div style={styles.leftContainer}>
				<div style={styles.welcomeContainer}>
					<h1 style={styles.welcomeText}>Welcome, Admin!</h1>
					<p style={styles.welcomeSubtext}>Here's what's happening today</p>
				</div>

				<div style={styles.chartsContainer}>
					<div style={styles.chartCard}>
						<JobPostsChart chartDate={jobPostChatDate} />
					</div>
					<div style={styles.chartCard}>
						<EventsChart chartDate={jobPostChatDate} />
					</div>
				</div>

				<div style={styles.calendarCard}>
					<EventsCalendar eventItemList={events} />
				</div>
			</div>

			<div style={styles.rightContainer}>
				<CountsDisplayWidgets countsList={countList} />
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
					<p style={styles.loadingText}>Loading dashboard data...</p>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default UniAdminDashboard
