import { useEffect, useState } from 'react'
import CountsDisplayWidgets, { SummeryCounts } from '../../../components/uni-admin/dashboard/counts-display-widgets/counts-display-widgets'
import EventsCalendar, { EventItem } from '../../../components/uni-admin/dashboard/events-calendar/events-calendar'
import EventsChart from '../../../components/uni-admin/dashboard/events-chart/events-chart'
import JobPostsChart, { JobPostChatDate } from '../../../components/uni-admin/dashboard/job-posts-chart/job-posts-chart'
import { EventsResponse, useGetSocialSummery } from '../../../hooks/uni-admin/dashboard/useGetSocialSummery'
import IEvents from '@/assets/images/events.svg'
import Iadmins from '@/assets/images/nav-admin.svg'
import Istudents from '@/assets/images/nav-students.svg'
import ILecturers from '@/assets/images/nav-lecturers.svg'
import IStaff from '@/assets/images/nav-staff.svg'
import './uni-admin-dashboard.scss'
import { DateTimeToOnlyDateMonth } from '../../../utils/dateTImeHandler'
import { useGetAuthSummery } from '../../../hooks/uni-admin/dashboard/useGetAuthSummery'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { Modal, Spinner } from 'react-bootstrap'

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
		error_socialSummery
	} = useGetSocialSummery()

	const {
		getAuthSummeryResponse,
		isValidating_getAuthSummery,
		isLoading_getAuthSummery,
		error_authSummery,
		mutate_getAuthSummery
	} = useGetAuthSummery()
	

	const setListCount = (item: SummeryCounts) => {
		const existingItem = countList.find(countItem => countItem.title === item.title);
		if (existingItem) {
			setCountList(prev => [...prev.filter(countItem => countItem.title !== item.title), item])
		} else {
			setCountList((prev) => [...prev, item])
		}
	}

	const setEventsToCalendar = (events: EventsResponse[]) => {

		const convertedList = events.map(item => ({
			id: item.id,
			title: item.time,
			desc: item.desc,
			start: new Date(item.start),
			end: new Date(item.end),
			time: new Date(item.time)
		}))

		setEvents(convertedList)

	}

	useEffect(() => {
		setCountList([])
		mutate_getAuthSummery()
		mutate_getSocialSummery()
	}, [])

	useEffect(() => {

		let chatData: JobPostChatDate[] = [];

		if (getSocualSummeryResponse) {

			const postCounts = getSocualSummeryResponse.postCounts;
			const jobCounts = getSocualSummeryResponse.jobCounts;

			const dates = jobCounts.map(item => item.date);
			postCounts.forEach(item => {
				if(!dates.includes(item.date)) {
					dates.push(item.date)
				}
			})
			dates.sort();
		
			chatData = dates.map(date => {

				const post = postCounts.find(post => post.date === date);
				const job = jobCounts.find(job => job.date === date)
	
				return {
					date: DateTimeToOnlyDateMonth(date),
					job: job ? job.count : 0,
					post: post ? post.count : 0
				} as JobPostChatDate
			})

			setListCount({
				count: getSocualSummeryResponse.eventCount,
				icon: IEvents,
				title: "Events"
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
					title: "Admins",
					icon: Iadmins
				})
			}

			if (getAuthSummeryResponse.lecture) {
				setListCount({
					count: getAuthSummeryResponse.lecture,
					title: "Lecturers",
					icon: ILecturers
				})
			}

			if (getAuthSummeryResponse.staff) {
				setListCount({
					count: getAuthSummeryResponse.staff,
					title: "Staff",
					icon: IStaff
				})
			}

			if (getAuthSummeryResponse.student) {
				setListCount({
					count: getAuthSummeryResponse.student,
					title: "Students",
					icon: Istudents
				})
			}

		}

	}, [getAuthSummeryResponse])

	useEffect(() => {
		errorDisplayHandler(error_authSummery)
		errorDisplayHandler(error_socialSummery)
	}, [error_authSummery, error_socialSummery])


	useEffect(() => {
		if (isLoading_getSocialSummery ||
			isValidating_getSocialSummery ||
			isLoading_getAuthSummery ||
			isValidating_getAuthSummery) {
				setIsLoading(true)
			}
		else {
			setIsLoading(false)
		}
	}, [
		isLoading_getSocialSummery,
		isValidating_getSocialSummery,
		isLoading_getAuthSummery,
		isValidating_getAuthSummery
	])

	return (
		<>
			<div className="page uni-admin-dashboard">
				<div className="left-container">
					<h3 className="welcome-text">Welcome, Admin!</h3>
					<div className="charts-container">
						<div className="job-posts-chart">
							<JobPostsChart chartDate={jobPostChatDate} />
						</div>
						<div className="events-chart">
							<EventsChart chartDate={jobPostChatDate} />
						</div>
					</div>
					<div className="events-calendar">
						<EventsCalendar eventItemList={events} />
					</div>
				</div>

				<div className="right-container">
					<CountsDisplayWidgets countsList={countList} />
				</div>
			</div>

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

export default UniAdminDashboard
