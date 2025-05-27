/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
	Button,
	Form,
	Modal,
	Spinner,
	Container,
	Row,
	Col,
	Card,
	Image,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
	FiCalendar,
	FiFilter,
	FiPlusCircle,
	FiMapPin,
	FiClock,
	FiChevronRight,
	FiUsers,
	FiMessageSquare,
	FiShare2,
	FiBookmark,
	FiHeart,
} from 'react-icons/fi'
import Select from 'react-dropdown-select'
import {
	GetModeListResponse,
	useGetModeList,
} from '../../../hooks/web/web-events/useGetModeList'
import { useGetEvent } from '../../../hooks/web/web-events/useGetEvent'
import {
	GetEventListResponse,
	useGetEventList,
} from '../../../hooks/web/web-events/useGetEventList'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import {
	GetLocationListResponse,
	useGetLocationList,
} from '../../../hooks/web/jobs/useGetLocationList'
import { generateAvatarImage } from '../../../utils/profileAvatarGenerator'
import { element } from 'prop-types'
// import EventPostForm from '../../../components/web/web-events/event-post-form/event-post-form'

interface FormData {
	search?: string
	selectedModes?: GetModeListResponse[]
	selectedLocations?: GetLocationListResponse[]
}

const WebEvents = () => {
	const { eventId } = useParams()
	const navigate = useNavigate()
	const { handleSubmit, register, setValue } = useForm<FormData>()
	const [isLoading, setIsLoading] = useState(false)
	const [manuallySelected, setManuallySelected] = useState(false)
	const [filtered, setFiltered] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState<GetEventListResponse>()
	const [locationList, setLocationList] = useState<GetLocationListResponse[]>(
		[]
	)
	const [modeList, setModeList] = useState<GetModeListResponse[]>([])
	const [showPostForm, setShowPostForm] = useState(false)
	const [activeTab, setActiveTab] = useState('details') // 'details' or 'discussion'

	const {
		isLoading_getEvents,
		isValidating_getEvents,
		error_getEvents,
		getEventsListResponse,
		mutate_getEvents,
		setLocationId_getEvents,
		setModeId_getEvents,
		setSearch_getEvents,
	} = useGetEventList()

	// get the user names of event posters
	let userName = ''
	if (
		Array.isArray(getEventsListResponse) &&
		(getEventsListResponse !== null || getEventsListResponse !== undefined)
	) {
		const extractedUserName =
			getEventsListResponse.map((ele) => ele.createdBy) ?? []
		extractedUserName.forEach((ele) => {
			userName = generateAvatarImage(ele)
		})
		// )
	}
	// Sample user data - replace with actual user context
	const currentUser = {
		id: 'user123',
		name: 'John Doe',
		// avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		avatar: userName,
		role: 'Developer',
	}

	// Sample event posts - replace with actual data fetching
	const [eventPosts, setEventPosts] = useState([
		{
			id: 'post1',
			userId: 'user123',
			userName: 'John Doe',
			userAvatar: userName,
			userRole: 'Developer',
			content: 'Looking forward to this event! Who else is attending?',
			timestamp: '2023-06-15T10:30:00Z',
			likes: 12,
			comments: 4,
			isLiked: false,
			isBookmarked: false,
		},
		{
			id: 'post2',
			userId: 'user456',
			userName: 'Jane Smith',
			userAvatar: userName,
			userRole: 'Designer',
			content:
				'This is going to be a great networking opportunity. Excited to meet everyone!',
			timestamp: '2023-06-14T15:45:00Z',
			likes: 8,
			comments: 2,
			isLiked: true,
			isBookmarked: true,
		},
	])

	const {
		isLoading_getEvent,
		isValidating_getEvent,
		error_getEvent,
		getEventResponse,
		setEventId_getEvent,
		mutate_getEvent,
	} = useGetEvent()

	const {
		isLoading_getLocations,
		isValidating_getLocations,
		error_getLocations,
		mutate_getLocations,
		getLocationsListResponse,
	} = useGetLocationList()

	const {
		isLoading_getMode,
		isValidating_getMode,
		error_getMode,
		mutate_getMode,
		getModeListResponse,
	} = useGetModeList()

	const eventItemSelectHandler = (item: GetEventListResponse) => {
		setManuallySelected(true)
		setFiltered(false)
		setSelectedEvent(item)
		navigate(`/events/${item.id}`)
	}

	const filterSubmitHandler = (data: FormData) => {
		setFiltered(true)
		setManuallySelected(false)
		setLocationId_getEvents(data.selectedLocations?.map((x) => x.id) || [''])
		setModeId_getEvents(data.selectedModes?.map((x) => x.id) || [''])
		setSearch_getEvents(data?.search || '')
		mutate_getEvents()
	}

	const handlePostSubmit = (postContent: string) => {
		// In a real app, this would call an API to create the post
		const newPost = {
			id: `post${Date.now()}`,
			userId: currentUser.id,
			userName: currentUser.name,
			// userAvatar: currentUser.avatar,
			userAvatar: userName,
			userRole: currentUser.role,
			content: postContent,
			timestamp: new Date().toISOString(),
			likes: 0,
			comments: 0,
			isLiked: false,
			isBookmarked: false,
		}
		setEventPosts([newPost, ...eventPosts])
		setShowPostForm(false)
	}

	const toggleLike = (postId: string) => {
		setEventPosts(
			eventPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						likes: post.isLiked ? post.likes - 1 : post.likes + 1,
						isLiked: !post.isLiked,
					}
				}
				return post
			})
		)
	}

	const toggleBookmark = (postId: string) => {
		setEventPosts(
			eventPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						isBookmarked: !post.isBookmarked,
					}
				}
				return post
			})
		)
	}

	useEffect(() => {
		mutate_getEvents()
		mutate_getLocations()
		mutate_getMode()
	}, [])

	useEffect(() => {
		if (eventId) {
			setEventId_getEvent(eventId)
			mutate_getEvent()
		}
	}, [eventId])

	useEffect(() => {
		if (getEventResponse && !manuallySelected) {
			setSelectedEvent(getEventResponse)
		}
	}, [getEventResponse])

	useEffect(() => {
		if (getEventsListResponse && getEventsListResponse.length === 0) {
			return
		}
		if (getEventsListResponse && filtered) {
			eventItemSelectHandler(getEventsListResponse[0])
		}
		if (getEventsListResponse && !eventId) {
			setSelectedEvent(getEventsListResponse[0])
			navigate(`/events/${getEventsListResponse[0].id}`)
		}
	}, [getEventsListResponse])

	useEffect(() => {
		setModeList(getModeListResponse || [])
	}, [getModeListResponse])

	useEffect(() => {
		setLocationList(getLocationsListResponse || [])
	}, [getLocationsListResponse])

	useEffect(() => {
		if (
			isLoading_getEvent ||
			isLoading_getEvents ||
			isLoading_getLocations ||
			isLoading_getMode ||
			isValidating_getEvent ||
			isValidating_getEvents ||
			isValidating_getLocations ||
			isValidating_getMode
		) {
			setIsLoading(true)
		} else setIsLoading(false)
	}, [
		isLoading_getEvent,
		isLoading_getEvents,
		isLoading_getLocations,
		isLoading_getMode,
		isValidating_getEvent,
		isValidating_getEvents,
		isValidating_getLocations,
		isValidating_getMode,
	])

	useEffect(() => {
		errorDisplayHandler(error_getEvent)
		errorDisplayHandler(error_getEvents)
		errorDisplayHandler(error_getLocations)
		errorDisplayHandler(error_getMode)
	}, [error_getEvent, error_getEvents, error_getLocations, error_getMode])

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
			{/* Filter Section */}
			<Row className="mb-4">
				<Col>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							padding: '1.5rem',
						}}
					>
						<Form onSubmit={handleSubmit(filterSubmitHandler)}>
							<Row>
								<Col md={4}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Search
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Event name or organizer"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.75rem 1rem',
											}}
											{...register('search')}
										/>
									</Form.Group>
								</Col>

								<Col md={3}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Mode
										</Form.Label>
										<Select
											options={modeList.map((type) => ({
												value: type.id,
												label: type.key,
											}))}
											values={[]}
											multi
											onChange={(val) => {
												setValue(
													'selectedModes',
													val.map((v) => ({
														id: v.value,
														key: v.label,
													}))
												)
											}}
											placeholder="Select modes"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.25rem',
											}}
										/>
									</Form.Group>
								</Col>

								<Col md={3}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Location
										</Form.Label>
										<Select
											options={locationList.map((type) => ({
												value: type.id,
												label: type.location,
											}))}
											values={[]}
											multi
											onChange={(val) => {
												setValue(
													'selectedLocations',
													val.map((v) => ({
														id: v.value,
														location: v.label,
													}))
												)
											}}
											placeholder="Select locations"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.25rem',
											}}
										/>
									</Form.Group>
								</Col>

								<Col
									md={2}
									className="d-flex align-items-end"
									style={{ marginBottom: '0.9rem' }}
								>
									<Button
										type="submit"
										style={{
											background:
												'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '0.75rem 1.5rem',
											fontWeight: '600',
											color: '#FFFFFF',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											width: '100%',
											justifyContent: 'center',
										}}
									>
										<FiFilter size={18} />
										Filter
									</Button>
								</Col>
							</Row>
						</Form>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col>
					<Button
						onClick={() => navigate('/create-event')}
						style={{
							background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
							border: 'none',
							borderRadius: '12px',
							padding: '0.75rem 1.5rem',
							marginLeft: '1.5rem',
							fontWeight: '600',
							color: '#FFFFFF',
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							transition: 'all 0.2s ease',
							boxShadow: '0 4px 6px rgba(139, 92, 246, 0.15)',
						}}
					>
						<FiPlusCircle size={18} />
						Create Event
					</Button>
				</Col>
			</Row>

			<Row>
				{/* Events List Column */}
				<Col lg={5}>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							height: '100%',
						}}
					>
						<Card.Body style={{ padding: '1.5rem' }}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
									marginBottom: '1.5rem',
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

							{getEventsListResponse && getEventsListResponse.length > 0 ? (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
									}}
								>
									{getEventsListResponse.map((event) => (
										<div
											key={event.id}
											onClick={() => eventItemSelectHandler(event)}
											style={{
												backgroundColor:
													event.id === selectedEvent?.id
														? '#F1F5F9'
														: '#FFFFFF',
												borderRadius: '12px',
												padding: '1.5rem',
												border:
													event.id === selectedEvent?.id
														? '1px solid #8B5CF6'
														: '1px solid #E2E8F0',
												cursor: 'pointer',
												transition: 'all 0.2s ease',
												':hover': {
													transform: 'translateY(-2px)',
													boxShadow: '0 4px 6px rgba(139, 92, 246, 0.1)',
												},
											}}
										>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '0.75rem',
													marginBottom: '0.75rem',
												}}
											>
												<Image
													src={
														generateAvatarImage(event.createdBy) ||
														'https://randomuser.me/api/portraits/men/32.jpg'
													}
													roundedCircle
													style={{
														width: '40px',
														height: '40px',
														objectFit: 'cover',
														border: '2px solid #F1F5F9',
													}}
												/>
												<div>
													<h4
														style={{
															color: '#1E293B',
															fontWeight: '600',
															fontSize: '1rem',
															marginBottom: '0.1rem',
														}}
													>
														{event.title}
													</h4>
													<p
														style={{
															color: '#64748B',
															fontSize: '0.75rem',
														}}
													>
														Hosted by {event.companyName}
													</p>
												</div>
											</div>
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
														color: '#7C3AED',
														fontWeight: '600',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
														display: 'flex',
														alignItems: 'center',
														gap: '0.25rem',
													}}
												>
													<FiCalendar size={12} />
													{new Date(event.createdAt).toLocaleDateString()}
												</span>
												<span
													style={{
														backgroundColor: 'rgba(59, 130, 246, 0.1)',
														color: '#1D4ED8',
														fontWeight: '600',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
														display: 'flex',
														alignItems: 'center',
														gap: '0.25rem',
													}}
												>
													<FiMapPin size={12} />
													{event.location?.location || 'Online'}
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
									))}
								</div>
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
										<FiCalendar />
									</div>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											marginBottom: '0.5rem',
										}}
									>
										No events found
									</h3>
									<p
										style={{
											fontSize: '1rem',
											maxWidth: '400px',
											margin: '0 auto 1.5rem',
										}}
									>
										Try adjusting your search filters or check back later.
									</p>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>

				{/* Event Details Column */}
				<Col lg={7}>
					{selectedEvent ? (
						<Card
							style={{
								border: '1px solid #F1F5F9',
								borderRadius: '16px',
								boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
								height: '100%',
							}}
						>
							<Card.Body style={{ padding: '0' }}>
								{/* Event Header with Organizer Info */}
								<div
									style={{ padding: '2rem', borderBottom: '1px solid #F1F5F9' }}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
											marginBottom: '1.5rem',
										}}
									>
										<Image
											src={
												generateAvatarImage(selectedEvent.createdBy) ||
												'https://randomuser.me/api/portraits/men/32.jpg'
											}
											roundedCircle
											style={{
												width: '60px',
												height: '60px',
												objectFit: 'cover',
												border: '2px solid #F1F5F9',
											}}
										/>
										<div>
											<h2
												style={{
													color: '#1E293B',
													fontWeight: '700',
													fontSize: '1.75rem',
													marginBottom: '0.25rem',
												}}
											>
												{selectedEvent.title}
											</h2>
											<p
												style={{
													color: '#8B5CF6',
													fontWeight: '600',
													fontSize: '1rem',
												}}
											>
												Hosted by {selectedEvent.companyName}
											</p>
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
											flexWrap: 'wrap',
											marginBottom: '1.5rem',
										}}
									>
										<span
											style={{
												backgroundColor: 'rgba(139, 92, 246, 0.1)',
												color: '#7C3AED',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiCalendar size={14} />
											{new Date(selectedEvent.createdAt).toLocaleDateString()}
										</span>
										<span
											style={{
												backgroundColor: 'rgba(59, 130, 246, 0.1)',
												color: '#1D4ED8',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiMapPin size={14} />
											{selectedEvent.location?.location || 'Online'}
										</span>
										<span
											style={{
												backgroundColor: 'rgba(16, 185, 129, 0.1)',
												color: '#047857',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiClock size={14} />
											{selectedEvent.time || 'TBD'}
										</span>
										<span
											style={{
												backgroundColor: 'rgba(244, 63, 94, 0.1)',
												color: '#DB2777',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiUsers size={14} />
											{selectedEvent.attendees || '0'} attending
										</span>
									</div>
									<Button
										variant="primary"
										style={{
											background:
												'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '0.75rem 2rem',
											fontWeight: '600',
											boxShadow: '0 4px 6px rgba(139, 92, 246, 0.15)',
											display: 'inline-flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
									>
										Register Now <FiChevronRight size={18} />
									</Button>
								</div>

								{/* Tabs */}
								<div
									style={{ display: 'flex', borderBottom: '1px solid #F1F5F9' }}
								>
									<button
										onClick={() => setActiveTab('details')}
										style={{
											flex: 1,
											padding: '1rem',
											background: 'none',
											border: 'none',
											borderBottom:
												activeTab === 'details' ? '2px solid #8B5CF6' : 'none',
											color: activeTab === 'details' ? '#8B5CF6' : '#64748B',
											fontWeight: '600',
											cursor: 'pointer',
										}}
									>
										Event Details
									</button>
									<button
										onClick={() => setActiveTab('discussion')}
										style={{
											flex: 1,
											padding: '1rem',
											background: 'none',
											border: 'none',
											borderBottom:
												activeTab === 'discussion'
													? '2px solid #8B5CF6'
													: 'none',
											color: activeTab === 'discussion' ? '#8B5CF6' : '#64748B',
											fontWeight: '600',
											cursor: 'pointer',
										}}
									>
										Discussion ({eventPosts.length})
									</button>
								</div>

								{/* Tab Content */}
								<div style={{ padding: '2rem' }}>
									{activeTab === 'details' ? (
										<>
											{selectedEvent.url && (
												<div style={{ marginBottom: '2rem' }}>
													<Image
														src={selectedEvent.url}
														alt="Event banner"
														fluid
														style={{
															borderRadius: '12px',
															width: '100%',
															maxHeight: '400px',
															objectFit: 'cover',
														}}
													/>
												</div>
											)}

											<div style={{ marginBottom: '2rem' }}>
												<h3
													style={{
														color: '#1E293B',
														fontWeight: '600',
														fontSize: '1.25rem',
														marginBottom: '1rem',
													}}
												>
													Event Description
												</h3>
												<div
													style={{
														color: '#475569',
														lineHeight: '1.6',
														whiteSpace: 'pre-line',
													}}
												>
													{selectedEvent.description ||
														'No description provided.'}
												</div>
											</div>

											<div>
												<h3
													style={{
														color: '#1E293B',
														fontWeight: '600',
														fontSize: '1.25rem',
														marginBottom: '1rem',
													}}
												>
													Tags
												</h3>
												<div
													style={{
														display: 'flex',
														gap: '0.5rem',
														flexWrap: 'wrap',
													}}
												>
													{selectedEvent.tags?.length ? (
														selectedEvent.tags.map((tag, i) => (
															<span
																key={i}
																style={{
																	backgroundColor: 'rgba(226, 232, 240, 0.5)',
																	color: '#475569',
																	fontWeight: '500',
																	padding: '0.5rem 1rem',
																	borderRadius: '8px',
																	fontSize: '0.875rem',
																}}
															>
																{tag}
															</span>
														))
													) : (
														<span style={{ color: '#64748B' }}>
															No tags specified
														</span>
													)}
												</div>
											</div>
										</>
									) : (
										<div>
											{/* Post Form */}
											<div
												style={{
													display: 'flex',
													gap: '1rem',
													marginBottom: '2rem',
													padding: '1rem',
													backgroundColor: '#F8FAFC',
													borderRadius: '12px',
												}}
											>
												<Image
													src={currentUser.avatar}
													roundedCircle
													style={{
														width: '48px',
														height: '48px',
														objectFit: 'cover',
														border: '2px solid #F1F5F9',
													}}
												/>
												<div style={{ flex: 1 }}>
													{/* <EventPostForm
														onSubmit={handlePostSubmit}
														onCancel={() => setShowPostForm(false)}
													/> */}
												</div>
											</div>

											{/* Posts List */}
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													gap: '1.5rem',
												}}
											>
												{eventPosts.length > 0 ? (
													eventPosts.map((post) => (
														<Card
															key={post.id}
															style={{
																border: '1px solid #F1F5F9',
																borderRadius: '12px',
															}}
														>
															<Card.Body style={{ padding: '1.5rem' }}>
																<div
																	style={{
																		display: 'flex',
																		gap: '1rem',
																		marginBottom: '1rem',
																	}}
																>
																	<Image
																		src={post.userAvatar}
																		roundedCircle
																		style={{
																			width: '48px',
																			height: '48px',
																			objectFit: 'cover',
																			border: '2px solid #F1F5F9',
																		}}
																	/>
																	<div>
																		<h5
																			style={{
																				color: '#1E293B',
																				fontWeight: '600',
																				marginBottom: '0.25rem',
																			}}
																		>
																			{post.userName}
																		</h5>
																		<p
																			style={{
																				color: '#64748B',
																				fontSize: '0.75rem',
																				marginBottom: '0',
																			}}
																		>
																			{post.userRole} •{' '}
																			{new Date(
																				post.timestamp
																			).toLocaleString()}
																		</p>
																	</div>
																</div>
																<p
																	style={{
																		color: '#1E293B',
																		marginBottom: '1rem',
																		lineHeight: '1.6',
																	}}
																>
																	{post.content}
																</p>
																<div
																	style={{
																		display: 'flex',
																		justifyContent: 'space-between',
																		borderTop: '1px solid #F1F5F9',
																		paddingTop: '1rem',
																	}}
																>
																	<button
																		onClick={() => toggleLike(post.id)}
																		style={{
																			background: 'none',
																			border: 'none',
																			display: 'flex',
																			alignItems: 'center',
																			gap: '0.5rem',
																			color: post.isLiked
																				? '#DB2777'
																				: '#64748B',
																			cursor: 'pointer',
																		}}
																	>
																		<FiHeart
																			fill={post.isLiked ? '#DB2777' : 'none'}
																		/>
																		{post.likes}{' '}
																		{post.likes === 1 ? 'Like' : 'Likes'}
																	</button>
																	<button
																		style={{
																			background: 'none',
																			border: 'none',
																			display: 'flex',
																			alignItems: 'center',
																			gap: '0.5rem',
																			color: '#64748B',
																			cursor: 'pointer',
																		}}
																	>
																		<FiMessageSquare />
																		{post.comments}{' '}
																		{post.comments === 1
																			? 'Comment'
																			: 'Comments'}
																	</button>
																	<button
																		style={{
																			background: 'none',
																			border: 'none',
																			display: 'flex',
																			alignItems: 'center',
																			gap: '0.5rem',
																			color: '#64748B',
																			cursor: 'pointer',
																		}}
																	>
																		<FiShare2 />
																		Share
																	</button>
																	<button
																		onClick={() => toggleBookmark(post.id)}
																		style={{
																			background: 'none',
																			border: 'none',
																			display: 'flex',
																			alignItems: 'center',
																			gap: '0.5rem',
																			color: post.isBookmarked
																				? '#8B5CF6'
																				: '#64748B',
																			cursor: 'pointer',
																		}}
																	>
																		<FiBookmark
																			fill={
																				post.isBookmarked ? '#8B5CF6' : 'none'
																			}
																		/>
																		{post.isBookmarked ? 'Saved' : 'Save'}
																	</button>
																</div>
															</Card.Body>
														</Card>
													))
												) : (
													<div
														style={{
															textAlign: 'center',
															padding: '2rem',
															color: '#64748B',
														}}
													>
														<FiMessageSquare
															size={48}
															style={{
																color: '#E2E8F0',
																marginBottom: '1rem',
															}}
														/>
														<h4
															style={{
																color: '#1E293B',
																fontWeight: '600',
																marginBottom: '0.5rem',
															}}
														>
															No posts yet
														</h4>
														<p>Be the first to start the discussion!</p>
													</div>
												)}
											</div>
										</div>
									)}
								</div>
							</Card.Body>
						</Card>
					) : (
						<Card
							style={{
								border: '1px solid #F1F5F9',
								borderRadius: '16px',
								boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Card.Body style={{ textAlign: 'center', padding: '3rem' }}>
								<div
									style={{
										fontSize: '5rem',
										color: '#E2E8F0',
										marginBottom: '1rem',
									}}
								>
									<FiCalendar />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										marginBottom: '0.5rem',
									}}
								>
									Select an event to view details
								</h3>
								<p style={{ color: '#64748B', marginBottom: 0 }}>
									Choose from the list on the left to see the full event
									description and discussion
								</p>
							</Card.Body>
						</Card>
					)}
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
								borderColor: '#8B5CF6 transparent #8B5CF6 transparent',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: '-10px',
								left: '-10px',
								right: '-10px',
								bottom: '-10px',
								border: '2px solid rgba(139, 92, 246, 0.2)',
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
						Loading Events
					</h4>
					<p
						style={{
							color: '#64748B',
							fontSize: '0.875rem',
							marginBottom: 0,
						}}
					>
						Fetching the latest tech events...
					</p>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default WebEvents
