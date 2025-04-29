/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Container,
	Modal,
	Spinner,
	Card,
	Row,
	Col,
} from 'react-bootstrap'
// import axios from 'axio'
import { useNavigate } from 'react-router-dom'
import './web-dashboard.scss'
import { useGetPostsList } from '../../../hooks/web/posts/useGetPostsList'
import { useEffect, useMemo, useState } from 'react'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import PostsList from '../../../components/web/posts/posts-list/posts-list'
import JobsItem from '../../../components/web/jobs/jobs-item/jobs-item'
import {
	GetJobListResponse,
	useGetJobList,
} from '../../../hooks/web/jobs/useGetJobList'
import {
	FiPlusCircle,
	FiChevronRight,
	FiBriefcase,
	FiCalendar,
	FiMessageSquare,
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../application/store'
import axios from 'axios'
import { setEventList } from '../../../features/events/eventSlice'

type EventList = {
	id: string
	title: string
	companyName: string
	createdAt: string
	updatedAt: string
	description?: string
	createdBy?: string
	location?: {
		id: string
		location: string
	}
	mode?: {
		id: string
		key: string
	}
	tags?: string[] | null
	time?: string
	url?: string
}

const WebDashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [eventList, setEvenetList] = useState<EventList[]>([])
	// const eventList = useSelector((state: RootState) => state.events.eventList)
	const latestThree = useMemo(() => {
		if (!eventList) return []

		return [...eventList]
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
			.slice(0, 3)
	}, [eventList])

	const {
		getPostsListResponse,
		isLoading_getPostsList,
		isValidating_getPostsList,
		error_getPostsList,
		mutate_getPostsList,
	} = useGetPostsList()
	const {
		isLoading_getJobs,
		isValidating_getJobs,
		error_getJobs,
		mutate_getJobs,
		getJobsListResponse,
		setSize_getJobs,
	} = useGetJobList()

	const jobSelectHandler = (job: GetJobListResponse) => {
		navigate('/jobs/' + job.id)
	}
	const eventSelectHandler = (event: GetJobListResponse) => {
		navigate('/events/' + event.id)
	}
	// useEffect(() => {
	// 	if (data) {
	// 		dispatch(setEventList(data))
	// 	}
	// }, [data, dispatch])
	useEffect(() => {
		axios
			.get('http://sltc.app.promentor.local:8084/api/v1/social/events?')
			.then(function (response) {
				setEvenetList(response?.data)
				dispatch(setEventList(response?.data))
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		setSize_getJobs('3')
		mutate_getJobs()
		mutate_getPostsList()
	}, [])

	useEffect(() => {
		if (
			isLoading_getPostsList ||
			isValidating_getPostsList ||
			isLoading_getJobs ||
			isValidating_getJobs
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_getPostsList,
		isValidating_getPostsList,
		isLoading_getJobs,
		isValidating_getJobs,
	])

	useEffect(() => {
		errorDisplayHandler(error_getPostsList)
		errorDisplayHandler(error_getJobs)
	}, [error_getPostsList, error_getJobs])

	return (
		<Container
			fluid
			className="web-dashboard-page"
			style={{
				backgroundColor: '#f8f9fa',
				minHeight: '100vh',
				padding: '2rem 0',
			}}
		>
			<Row>
				{/* Main Content Column - Posts Section */}
				<Col lg={8} className="mb-4">
					<Card
						className="border-0"
						style={{
							borderRadius: '12px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
							height: '100%',
							border: 'none',
						}}
					>
						<Card.Body style={{ padding: '2rem' }}>
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h2
									className="mb-0"
									style={{
										color: '#2d3748',
										fontWeight: '600',
										fontSize: '1.75rem',
									}}
								>
									Community Discussions
								</h2>
								<Button
									variant="primary"
									onClick={() => navigate('/create-post')}
									className="d-flex align-items-center"
									style={{
										backgroundColor: '#4f46e5',
										border: 'none',
										borderRadius: '8px',
										padding: '0.5rem 1.25rem',
										fontWeight: '500',
										boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
										transition: 'all 0.2s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.transform = 'translateY(-2px)')
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = 'translateY(0)')
									}
								>
									<FiPlusCircle className="me-2" /> New Post
								</Button>
							</div>

							{getPostsListResponse && getPostsListResponse.length > 0 ? (
								<PostsList
									list={getPostsListResponse}
									mutateList={mutate_getPostsList}
								/>
							) : (
								<div className="text-center py-5" style={{ color: '#718096' }}>
									<div
										style={{
											marginBottom: '1rem',
											fontSize: '5rem',
											color: '#e2e8f0',
										}}
									>
										<FiMessageSquare />
									</div>
									<h4
										style={{
											color: '#4a5568',
											fontWeight: '500',
											marginBottom: '0.5rem',
										}}
									>
										No discussions yet
									</h4>
									<p style={{ fontSize: '0.95rem' }}>
										Start the conversation by creating your first post!
									</p>
									<Button
										variant="outline-primary"
										onClick={() => navigate('/create-post')}
										style={{
											marginTop: '1rem',
											borderColor: '#4f46e5',
											color: '#4f46e5',
											borderRadius: '8px',
										}}
									>
										Create Post
									</Button>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>

				{/* Sidebar Column */}
				<Col lg={4}>
					{/* Events Section */}
					<Card
						className="border-0 mb-4"
						style={{
							borderRadius: '12px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
							border: 'none',
						}}
					>
						<Card.Body style={{ padding: '1.5rem' }}>
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h5
									className="mb-0"
									style={{
										color: '#2d3748',
										fontWeight: '600',
										fontSize: '1.25rem',
									}}
								>
									<FiCalendar className="me-2" style={{ color: '#4f46e5' }} />
									Upcoming Events
								</h5>
								<Button
									variant="link"
									onClick={() => navigate('/events')}
									className="text-decoration-none p-0 d-flex align-items-center"
									style={{
										color: '#4f46e5',
										fontWeight: '500',
										fontSize: '0.875rem',
									}}
								>
									View all <FiChevronRight className="ms-1" />
								</Button>
							</div>

							<div className="events-list">
								{latestThree?.length ? (
									latestThree.map((event) => (
										<JobsItem
											item={event}
											key={event.id}
											setSelectedJob={eventSelectHandler}
											style={{
												marginBottom: '1rem',
												borderLeft: '3px solid #4f46e5',
												paddingLeft: '1rem',
												transition: 'all 0.2s ease',
											}}
										/>
									))
								) : (
									<div
										className="text-center py-3"
										style={{ color: '#718096' }}
									>
										<FiCalendar className="me-2" />
										No upcoming events
									</div>
								)}
							</div>
						</Card.Body>
					</Card>

					{/* Jobs Section */}
					<Card
						className="border-0"
						style={{
							borderRadius: '12px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
							border: 'none',
						}}
					>
						<Card.Body style={{ padding: '1.5rem' }}>
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h5
									className="mb-0"
									style={{
										color: '#2d3748',
										fontWeight: '600',
										fontSize: '1.25rem',
									}}
								>
									<FiBriefcase className="me-2" style={{ color: '#4f46e5' }} />
									{/* Job Opportunities */}
									Latest Job Posts
								</h5>
								<Button
									variant="link"
									onClick={() => navigate('/jobs')}
									className="text-decoration-none p-0 d-flex align-items-center"
									style={{
										color: '#4f46e5',
										fontWeight: '500',
										fontSize: '0.875rem',
									}}
								>
									View all <FiChevronRight className="ms-1" />
								</Button>
							</div>

							<div className="jobs-list">
								{getJobsListResponse?.length ? (
									getJobsListResponse.map((job) => (
										<JobsItem
											item={job}
											key={job.id}
											setSelectedJob={jobSelectHandler}
											style={{
												marginBottom: '1rem',
												borderLeft: '3px solid #4f46e5',
												paddingLeft: '1rem',
												transition: 'all 0.2s ease',
											}}
										/>
									))
								) : (
									<div
										className="text-center py-3"
										style={{ color: '#718096' }}
									>
										<FiBriefcase className="me-2" />
										No job postings available
									</div>
								)}
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Loader overlay */}
			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={{ border: 'none' }}
			>
				<Modal.Body
					className="text-center p-4"
					style={{
						backgroundColor: '#ffffff',
						borderRadius: '12px',
						border: 'none',
					}}
				>
					<Spinner
						animation="border"
						variant="primary"
						role="status"
						style={{
							width: '3rem',
							height: '3rem',
							borderWidth: '0.25rem',
							borderColor: '#4f46e5 transparent #4f46e5 transparent',
						}}
					/>
					<p
						className="mt-3 mb-0"
						style={{
							color: '#4a5568',
							fontWeight: '500',
							fontSize: '1.1rem',
						}}
					>
						Loading content...
					</p>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default WebDashboard
