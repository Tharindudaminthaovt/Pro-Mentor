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
import { useNavigate } from 'react-router-dom'
import { useGetPostsList } from '../../../hooks/web/posts/useGetPostsList'
import { useEffect, useMemo, useState } from 'react'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import PostsList from '../../../components/web/posts/posts-list/posts-list'
import { useGetJobList } from '../../../hooks/web/jobs/useGetJobList'
import {
	FiPlusCircle,
	FiChevronRight,
	FiBriefcase,
	FiCalendar,
	FiMessageSquare,
	FiCode,
	FiCpu,
	FiGitBranch,
	FiCloud,
	FiAward,
} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setEventList } from '../../../features/events/eventSlice'

const WebDashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [eventLists, setEventLists] = useState([])
	const [jobList, setJobList] = useState([])
	const [activeTech, setActiveTech] = useState('AI')

	const techTrends = [
		{ name: 'AI', color: '#8B5CF6', icon: <FiCpu /> },
		{ name: 'Web3', color: '#F59E0B', icon: <FiGitBranch /> },
		{ name: 'Cloud', color: '#3B82F6', icon: <FiCloud /> },
		{ name: 'DevOps', color: '#10B981', icon: <FiCode /> },
		{ name: 'Quantum', color: '#EC4899', icon: <FiAward /> },
	]

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

	const latestThreeEvents = useMemo(() => {
		if (!eventLists) return []
		return [...eventLists]
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			.slice(0, 3)
	}, [eventLists])

	const latestThreeJobs = useMemo(() => {
		if (!jobList) return []
		return [...jobList]
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			.slice(0, 3)
	}, [jobList])

	const jobSelectHandler = (job) => {
		navigate('/jobs/' + job.id)
	}

	const eventSelectHandler = (event) => {
		navigate('/events/' + event.id)
	}

	useEffect(() => {
		axios
			.get('http://nsbm.app.promentor.local:8084/api/v1/social/events?')
			.then((response) => {
				setEventLists(response?.data)
				dispatch(setEventList(response?.data))
			})
			.catch((error) => console.log('Dashboard Eventlist error ', error))
		axios
			.get('http://nsbm.app.promentor.local:8084/api/v1/social/jobs?')
			.then((response) => {
				setJobList(response?.data)
				// dispatch(setJobList(response?.data))
			})
			.catch((error) => console.log('Dashboard Joblist error ', error))
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
			style={{
				backgroundColor: '#FFFFFF',
				minHeight: '100vh',
				padding: '2rem 0',
				color: '#1E293B',
				fontFamily: "'Inter', sans-serif",
			}}
		>
			{/* Tech Trends Header */}
			<Row className="mb-4">
				<Col>
					<div
						style={{
							background: 'rgba(255, 255, 255, 0.9)',
							borderRadius: '16px',
							padding: '1.5rem',
							border: '1px solid rgba(226, 232, 240, 0.8)',
							boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05)',
							backdropFilter: 'blur(8px)',
							WebkitBackdropFilter: 'blur(8px)',
						}}
					>
						<h1
							style={{
								fontWeight: '800',
								fontSize: '2rem',
								background: 'linear-gradient(90deg, #4F46E5 0%, #8B5CF6 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								marginBottom: '1rem',
							}}
						>
							{/* Developer Nexus */}
							Pro Mentor
						</h1>
						<p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
							The hub for cutting-edge tech discussions and opportunities
						</p>
						<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
							{techTrends.map((tech) => (
								<Button
									key={tech.name}
									onClick={() => setActiveTech(tech.name)}
									style={{
										backgroundColor:
											activeTech === tech.name ? tech.color : '#F8FAFC',
										border:
											activeTech === tech.name ? 'none' : '1px solid #E2E8F0',
										borderRadius: '20px',
										padding: '0.5rem 1.25rem',
										fontWeight: '600',
										color: activeTech === tech.name ? '#FFFFFF' : '#1E293B',
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
										transition: 'all 0.2s ease',
										boxShadow:
											activeTech === tech.name
												? `0 4px 6px ${tech.color}30`
												: '0 2px 4px rgba(15, 23, 42, 0.05)',
									}}
								>
									<span style={{ fontSize: '1rem' }}>{tech.icon}</span>
									{tech.name}
								</Button>
							))}
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				{/* Main Content Column - Posts Section */}
				<Col lg={8} style={{ marginBottom: '2rem' }}>
					<div
						style={{
							backgroundColor: '#FFFFFF',
							borderRadius: '16px',
							padding: '2rem',
							border: '1px solid #F1F5F9',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							height: '100%',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '2rem',
							}}
						>
							<div
								style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
							>
								<div
									style={{
										width: '48px',
										height: '48px',
										borderRadius: '12px',
										background:
											'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
									}}
								>
									<FiMessageSquare size={24} color="#FFFFFF" />
								</div>
								<h2
									style={{
										color: '#1E293B',
										fontWeight: '700',
										fontSize: '1.5rem',
										margin: 0,
									}}
								>
									Code Forum
								</h2>
							</div>
							<Button
								onClick={() => navigate('/create-post')}
								style={{
									background:
										'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
									border: 'none',
									borderRadius: '12px',
									padding: '0.75rem 1.5rem',
									fontWeight: '600',
									color: '#FFFFFF',
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									transition: 'all 0.2s ease',
									boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-2px)'
									e.currentTarget.style.boxShadow =
										'0 6px 12px rgba(79, 70, 229, 0.2)'
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)'
									e.currentTarget.style.boxShadow =
										'0 4px 6px rgba(79, 70, 229, 0.15)'
								}}
							>
								<FiPlusCircle size={18} />
								New Post
							</Button>
						</div>

						{getPostsListResponse && getPostsListResponse.length > 0 ? (
							<PostsList
								list={getPostsListResponse}
								mutateList={mutate_getPostsList}
							/>
						) : (
							<div
								style={{
									textAlign: 'center',
									padding: '3rem 0',
									color: '#64748B',
								}}
							>
								<div
									style={{
										fontSize: '5rem',
										color: '#E2E8F0',
										marginBottom: '1rem',
									}}
								>
									<FiMessageSquare />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										marginBottom: '0.5rem',
									}}
								>
									No discussions yet
								</h3>
								<p
									style={{
										fontSize: '1rem',
										maxWidth: '400px',
										margin: '0 auto 1.5rem',
									}}
								>
									Break the ice! Share your latest hack, project, or tech
									insight.
								</p>
								<Button
									onClick={() => navigate('/create-post')}
									style={{
										background:
											'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
										border: 'none',
										borderRadius: '12px',
										padding: '0.75rem 2rem',
										fontWeight: '600',
										color: '#FFFFFF',
										transition: 'all 0.2s ease',
										boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
									}}
								>
									Start a Thread
								</Button>
							</div>
						)}
					</div>
				</Col>

				{/* Sidebar Column */}
				<Col lg={4}>
					{/* Developer Stats */}
					<div
						style={{
							backgroundColor: '#FFFFFF',
							borderRadius: '16px',
							padding: '1.5rem',
							border: '1px solid #F1F5F9',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							marginBottom: '2rem',
						}}
					>
						<h3
							style={{
								color: '#1E293B',
								fontWeight: '600',
								fontSize: '1.25rem',
								marginBottom: '1.5rem',
							}}
						>
							Your Dev Stats
						</h3>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '1rem',
							}}
						>
							{[
								{
									icon: <FiCode color="#4F46E5" size={20} />,
									label: 'Projects',
									value: '14',
									trend: '+3',
								},
								{
									icon: <FiGitBranch color="#8B5CF6" size={20} />,
									label: 'Commits',
									value: '87',
									trend: '+12',
								},
								{
									icon: <FiCpu color="#EC4899" size={20} />,
									label: 'Skills',
									value: '9',
									trend: '+1',
								},
								{
									icon: <FiCloud color="#3B82F6" size={20} />,
									label: 'Cloud',
									value: '5',
									trend: '+2',
								},
							].map((stat, index) => (
								<div
									key={index}
									style={{
										backgroundColor: '#F8FAFC',
										borderRadius: '12px',
										padding: '1rem',
										border: '1px solid #F1F5F9',
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											marginBottom: '0.5rem',
										}}
									>
										<div
											style={{
												width: '32px',
												height: '32px',
												borderRadius: '8px',
												backgroundColor: 'rgba(79, 70, 229, 0.1)',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												marginRight: '0.75rem',
											}}
										>
											{stat.icon}
										</div>
										<span
											style={{
												fontSize: '0.875rem',
												color: '#64748B',
											}}
										>
											{stat.label}
										</span>
									</div>
									<div style={{ display: 'flex', alignItems: 'baseline' }}>
										<span
											style={{
												fontSize: '1.5rem',
												fontWeight: '700',
												color: '#1E293B',
												marginRight: '0.5rem',
											}}
										>
											{stat.value}
										</span>
										<span
											style={{
												fontSize: '0.75rem',
												fontWeight: '600',
												color: '#10B981',
												backgroundColor: 'rgba(16, 185, 129, 0.1)',
												padding: '0.15rem 0.5rem',
												borderRadius: '9999px',
											}}
										>
											{stat.trend}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Events Section */}
					<div
						style={{
							backgroundColor: '#FFFFFF',
							borderRadius: '16px',
							padding: '1.5rem',
							border: '1px solid #F1F5F9',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							marginBottom: '2rem',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '1.5rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
								}}
							>
								<div
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '8px',
										background:
											'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 6px rgba(139, 92, 246, 0.15)',
									}}
								>
									<FiCalendar size={20} color="#FFFFFF" />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										fontSize: '1.25rem',
										margin: 0,
									}}
								>
									Tech Events
								</h3>
							</div>
							<button
								onClick={() => navigate('/events')}
								style={{
									background: 'none',
									border: 'none',
									color: '#8B5CF6',
									fontWeight: '600',
									fontSize: '0.875rem',
									display: 'flex',
									alignItems: 'center',
									gap: '0.25rem',
									cursor: 'pointer',
									padding: '0.25rem 0',
								}}
							>
								View all <FiChevronRight size={16} />
							</button>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
						>
							{latestThreeEvents?.length ? (
								latestThreeEvents.map((event) => (
									<div
										key={event.id}
										onClick={() => eventSelectHandler(event)}
										style={{
											backgroundColor: '#F8FAFC',
											borderRadius: '12px',
											padding: '1rem',
											borderLeft: '4px solid #8B5CF6',
											cursor: 'pointer',
											transition: 'all 0.2s ease',
											':hover': {
												transform: 'translateY(-2px)',
												boxShadow: '0 4px 6px rgba(139, 92, 246, 0.1)',
											},
										}}
									>
										<h4
											style={{
												color: '#1E293B',
												fontWeight: '600',
												fontSize: '1rem',
												marginBottom: '0.25rem',
											}}
										>
											{event.title}
										</h4>
										<p
											style={{
												color: '#64748B',
												fontSize: '0.875rem',
												marginBottom: '0.5rem',
											}}
										>
											{event.companyName}
										</p>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												flexWrap: 'wrap',
											}}
										>
											<span
												style={{
													backgroundColor: 'rgba(139, 92, 246, 0.1)',
													color: '#8B5CF6',
													fontWeight: '600',
													padding: '0.35rem 0.75rem',
													borderRadius: '8px',
													fontSize: '0.75rem',
												}}
											>
												{new Date(event.createdAt).toLocaleDateString()}
											</span>
											{event.tags?.slice(0, 2).map((tag, i) => (
												<span
													key={i}
													style={{
														backgroundColor: 'rgba(226, 232, 240, 0.5)',
														color: '#475569',
														fontWeight: '500',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
													}}
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								))
							) : (
								<div
									style={{
										textAlign: 'center',
										padding: '1.5rem',
										color: '#64748B',
									}}
								>
									<FiCalendar
										size={32}
										style={{ marginBottom: '0.5rem', opacity: 0.5 }}
									/>
									<p style={{ margin: 0 }}>No upcoming events</p>
								</div>
							)}
						</div>
					</div>

					{/* Jobs Section */}
					<div
						style={{
							backgroundColor: '#FFFFFF',
							borderRadius: '16px',
							padding: '1.5rem',
							border: '1px solid #F1F5F9',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '1.5rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
								}}
							>
								<div
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '8px',
										background:
											'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 6px rgba(59, 130, 246, 0.15)',
									}}
								>
									<FiBriefcase size={20} color="#FFFFFF" />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										fontSize: '1.25rem',
										margin: 0,
									}}
								>
									Tech Jobs
								</h3>
							</div>
							<button
								onClick={() => navigate('/jobs')}
								style={{
									background: 'none',
									border: 'none',
									color: '#3B82F6',
									fontWeight: '600',
									fontSize: '0.875rem',
									display: 'flex',
									alignItems: 'center',
									gap: '0.25rem',
									cursor: 'pointer',
									padding: '0.25rem 0',
								}}
							>
								View all <FiChevronRight size={16} />
							</button>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
						>
							{latestThreeJobs?.length ? (
								latestThreeJobs.map((job) => (
									<div
										key={job.id}
										onClick={() => jobSelectHandler(job)}
										style={{
											backgroundColor: '#F8FAFC',
											borderRadius: '12px',
											padding: '1rem',
											borderLeft: '4px solid #3B82F6',
											cursor: 'pointer',
											transition: 'all 0.2s ease',
											':hover': {
												transform: 'translateY(-2px)',
												boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)',
											},
										}}
									>
										<h4
											style={{
												color: '#1E293B',
												fontWeight: '600',
												fontSize: '1rem',
												marginBottom: '0.25rem',
											}}
										>
											{job.title}
										</h4>
										<p
											style={{
												color: '#64748B',
												fontSize: '0.875rem',
												marginBottom: '0.5rem',
											}}
										>
											{job.companyName}
										</p>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												flexWrap: 'wrap',
											}}
										>
											<span
												style={{
													backgroundColor: 'rgba(59, 130, 246, 0.1)',
													color: '#1D4ED8',
													fontWeight: '600',
													padding: '0.35rem 0.75rem',
													borderRadius: '8px',
													fontSize: '0.75rem',
												}}
											>
												{job.location?.location || 'Remote'}
											</span>
											{job.tags?.slice(0, 2).map((tag, i) => (
												<span
													key={i}
													style={{
														backgroundColor: 'rgba(226, 232, 240, 0.5)',
														color: '#475569',
														fontWeight: '500',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
													}}
												>
													{tag?.key}
												</span>
											))}
										</div>
									</div>
								))
							) : (
								<div
									style={{
										textAlign: 'center',
										padding: '1.5rem',
										color: '#64748B',
									}}
								>
									<FiBriefcase
										size={32}
										style={{ marginBottom: '0.5rem', opacity: 0.5 }}
									/>
									<p style={{ margin: 0 }}>No job postings available</p>
								</div>
							)}
						</div>
					</div>
				</Col>
			</Row>

			{/* Loader */}
			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
			>
				<Modal.Body
					style={{
						backgroundColor: '#FFFFFF',
						borderRadius: '16px',
						border: '1px solid #F1F5F9',
						padding: '2rem',
						textAlign: 'center',
						maxWidth: '300px',
						margin: '0 auto',
						boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '60px',
							height: '60px',
							margin: '0 auto 1.5rem',
						}}
					>
						<Spinner
							animation="border"
							variant="primary"
							style={{
								width: '60px',
								height: '60px',
								borderWidth: '4px',
								borderColor: '#4F46E5 transparent #4F46E5 transparent',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: '-10px',
								left: '-10px',
								right: '-10px',
								bottom: '-10px',
								border: '2px solid rgba(79, 70, 229, 0.2)',
								borderRadius: '50%',
								animation: 'pulse 2s infinite',
							}}
						></div>
					</div>
					<h4
						style={{
							color: '#1E293B',
							fontWeight: '600',
							marginBottom: '0.5rem',
						}}
					>
						Loading Interface
					</h4>
					<p
						style={{
							color: '#64748B',
							fontSize: '0.875rem',
							marginBottom: 0,
						}}
					>
						Fetching the latest developer resources...
					</p>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default WebDashboard
