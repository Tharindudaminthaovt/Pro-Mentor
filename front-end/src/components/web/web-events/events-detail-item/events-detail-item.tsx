// import {
// 	faClock,
// 	faLocationPin,
// 	faShare,
// 	faSuitcase,
// } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { timeAgo } from '../../../../utils/dateTImeHandler'
// import './events-detail-item.scss'
// import Avatar from 'react-avatar'
// import { Card } from 'react-bootstrap'
// import { GetEventListResponse } from '../../../../hooks/web/web-events/useGetEventList'

// type Props = {
// 	eventDetails: GetEventListResponse
// }

// function EventsDetailItem({ eventDetails }: Props) {
// 	return (
// 		<Card className="selected-event">
// 			<div className="selected-top-row">
// 				<div className="company-logo">
// 					<Avatar
// 						name={eventDetails.companyName}
// 						className="rounded-circle avatar"
// 						size="40"
// 					/>
// 					<div className="title-section">
// 						<div className="title">{eventDetails.title}</div>
// 						<div className="company-name">{eventDetails.companyName}</div>
// 					</div>
// 				</div>

// 				<div className="times-ago">{timeAgo(eventDetails.updatedAt)}</div>
// 				<div className="share-btn">
// 					<FontAwesomeIcon icon={faShare} />
// 				</div>
// 			</div>

// 			<div className="section-down">
// 				<div className="details-section">
// 					<img src={eventDetails.url} alt="banner" className="banner" />
// 					<div className="detail-item">
// 						<div className="detail-icon">
// 							<FontAwesomeIcon icon={faLocationPin} />
// 						</div>
// 						<div className="detail-detail">
// 							{eventDetails.location.location}
// 						</div>
// 					</div>
// 					<div className="detail-item">
// 						<div className="detail-icon">
// 							<FontAwesomeIcon icon={faSuitcase} />
// 						</div>
// 						<div className="detail-detail">{eventDetails.mode.key}</div>
// 					</div>
// 					<div className="detail-item">
// 						<div className="detail-icon">
// 							<FontAwesomeIcon icon={faClock} />
// 						</div>
// 						<div className="detail-detail">{eventDetails.time}</div>
// 					</div>
// 				</div>

// 				<div className="tags-section">
// 					{eventDetails.tags &&
// 						eventDetails.tags.map((tag) => (
// 							<div key={tag.id} className="badge rounded-pill text-bg-primary">
// 								{tag.key}
// 							</div>
// 						))}
// 				</div>

// 				<div className="description-section">{eventDetails.description}</div>
// 			</div>
// 		</Card>
// 	)
// }

// export default EventsDetailItem

import {
	FiCalendar,
	FiMapPin,
	FiClock,
	FiUsers,
	FiShare2,
	FiMessageSquare,
	FiBookmark,
	FiHeart,
} from 'react-icons/fi'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import { Card, Badge, Button, Image } from 'react-bootstrap'
import { GetEventListResponse } from '../../../../hooks/web/web-events/useGetEventList'
// import EventPostForm from '../event-post-form/event-post-form'
import { useState } from 'react'

type Props = {
	eventDetails: GetEventListResponse
}

function EventsDetailItem({ eventDetails }: Props) {
	const [activeTab, setActiveTab] = useState('details') // 'details' or 'discussion'
	const [showPostForm, setShowPostForm] = useState(false)
	const [eventPosts, setEventPosts] = useState([
		{
			id: 'post1',
			userId: 'user123',
			userName: 'John Doe',
			userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
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
			userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
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

	// Sample current user - replace with actual user context
	const currentUser = {
		id: 'user123',
		name: 'John Doe',
		avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		role: 'Developer',
	}

	const handlePostSubmit = (postContent: string) => {
		const newPost = {
			id: `post${Date.now()}`,
			userId: currentUser.id,
			userName: currentUser.name,
			userAvatar: currentUser.avatar,
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

	return (
		<Card
			style={{
				border: '1px solid #F1F5F9',
				borderRadius: '16px',
				boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
				height: '100%',
			}}
		>
			{/* Event Header */}
			<div style={{ padding: '2rem', borderBottom: '1px solid #F1F5F9' }}>
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
							eventDetails.organizerAvatar ||
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
							{eventDetails.title}
						</h2>
						<p
							style={{
								color: '#8B5CF6',
								fontWeight: '600',
								fontSize: '1rem',
							}}
						>
							Hosted by {eventDetails.companyName}
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
					<Badge
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
						{timeAgo(eventDetails.updatedAt)}
					</Badge>
					<Badge
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
						{eventDetails.location?.location || 'Online'}
					</Badge>
					<Badge
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
						{eventDetails.time || 'TBD'}
					</Badge>
					<Badge
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
						{eventDetails.attendees || '0'} attending
					</Badge>
				</div>
				<Button
					variant="primary"
					style={{
						background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
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
					Register Now <FiShare2 size={18} />
				</Button>
			</div>

			{/* Tabs */}
			<div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9' }}>
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
							activeTab === 'discussion' ? '2px solid #8B5CF6' : 'none',
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
						{eventDetails.url && (
							<div style={{ marginBottom: '2rem' }}>
								<Image
									src={eventDetails.url}
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
								{eventDetails.description || 'No description provided.'}
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
								{eventDetails.tags?.length ? (
									eventDetails.tags.map((tag, i) => (
										<Badge
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
											{tag.key}
										</Badge>
									))
								) : (
									<span style={{ color: '#64748B' }}>No tags specified</span>
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
														{new Date(post.timestamp).toLocaleString()}
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
														color: post.isLiked ? '#DB2777' : '#64748B',
														cursor: 'pointer',
													}}
												>
													<FiHeart fill={post.isLiked ? '#DB2777' : 'none'} />
													{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
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
													{post.comments === 1 ? 'Comment' : 'Comments'}
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
														color: post.isBookmarked ? '#8B5CF6' : '#64748B',
														cursor: 'pointer',
													}}
												>
													<FiBookmark
														fill={post.isBookmarked ? '#8B5CF6' : 'none'}
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
		</Card>
	)
}

export default EventsDetailItem
