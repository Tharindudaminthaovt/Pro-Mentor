import { useState, useEffect } from 'react'
import {
	FiEdit,
	FiHeart,
	FiMessageSquare,
	FiShare2,
	FiCalendar,
	FiBookmark,
	FiUser,
	FiUsers,
} from 'react-icons/fi'
import Avatar from 'react-avatar'
import axios from 'axios'
import { timeAgo } from '../../../utils/dateTImeHandler'
import { useSelector } from 'react-redux'
import { RootState } from '../../../application/store'
import ExpandDescription from '../../../components/shared/expand-description/expand-description'
import { Grid } from '@mui/material'
import { generateAvatarImage } from '../../../utils/profileAvatarGenerator'

const Profile = () => {
	// Profile data
	const [profile, setProfile] = useState({
		name: 'null',
		username: 'null',
		bio: 'Full-stack developer | Open source contributor | Coffee enthusiast',
		avatar: null,
		connections: 24, // Changed from followers/following to connections
		events: [],
	})

	const [activeTab, setActiveTab] = useState('posts')
	const [isEditing, setIsEditing] = useState(false)
	const [editData, setEditData] = useState({}) // Added for edit functionality
	const [posts, setPosts] = useState([])
	const [eventList, setEventList] = useState([])

	// const eventList = useSelector((state: RootState) => state.events.eventList)

	const PROFILE_USER_NAME_FROM_SESSON =
		sessionStorage.getItem('username') ||
		sessionStorage.getItem('usernameOrEmail')

	const PROFILE_USER_NAME =
		PROFILE_USER_NAME_FROM_SESSON && JSON.parse(PROFILE_USER_NAME_FROM_SESSON)

	const avartarImage = generateAvatarImage(PROFILE_USER_NAME)

	// Initialize edit data when profile loads
	useEffect(() => {
		setEditData({
			name: profile.name,
			bio: profile.bio,
		})
		setProfile({
			name: PROFILE_USER_NAME,
			username: PROFILE_USER_NAME,
			bio: 'Full-stack developer | Open source contributor | Coffee enthusiast',
			avatar: null,
			connections: 24, // Changed from followers/following to connections
			events: [],
		})
	}, [PROFILE_USER_NAME, profile.bio, profile.name])

	// Fetch posts
	useEffect(() => {
		fetchPostData()
	}, [])
	const fetchPostData = () => {
		axios
			.get(
				'http://nsbm.app.promentor.local:8084/api/v1/social/posts?page=0&size=1000'
			)
			.then(function (response) {
				setPosts(response?.data)
			})
			.catch(function (error) {
				console.log('error fetching posts in profile', error)
			})
		axios
			.get('http://nsbm.app.promentor.local:8084/api/v1/social/events?')
			.then(function (response) {
				setEventList(response?.data)
			})
			.catch(function (error) {
				console.log('error fetching events in profile', error)
			})
	}
	// Handle edit input changes
	const handleEditChange = (e) => {
		const { name, value } = e.target
		setEditData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// Save edited profile
	const handleSaveProfile = () => {
		setProfile((prev) => ({
			...prev,
			name: editData.name,
			bio: editData.bio,
		}))
		setIsEditing(false)
		// Here you would typically also update the backend
	}

	const handleLike = (postId) => {
		setProfile((prev) => ({
			...prev,
			posts: prev.posts.map((post) =>
				post.id === postId
					? {
							...post,
							likes: post.liked ? post.likes - 1 : post.likes + 1,
							liked: !post.liked,
						}
					: post
			),
		}))
	}

	const toggleEventAttendance = (eventId) => {
		setProfile((prev) => ({
			...prev,
			events: prev.events.map((event) =>
				event.id === eventId ? { ...event, attending: !event.attending } : event
			),
		}))
	}

	const postsCreatedByMe = () => {
		if (PROFILE_USER_NAME) {
			// fetchPostData()
			return posts.filter((post) => post?.createdBy === PROFILE_USER_NAME)
		}
		return []
	}
	const eventsCreatedByMe = () => {
		if (PROFILE_USER_NAME) {
			return eventList.filter((event) => event?.createdBy === PROFILE_USER_NAME)
		}
		return []
	}
	console.log('>>>> POSTS BY ME >>>', postsCreatedByMe())
	console.log('>>>> event list >>>', eventList)

	return (
		<div
			style={{
				maxWidth: '1200px',
				margin: '0 auto',
				padding: '20px',
				fontFamily: "'Inter', sans-serif",
				backgroundColor: '#f8fafc',
			}}
		>
			{/* Profile Header */}
			<div
				style={{
					display: 'flex',
					gap: '30px',
					padding: '30px',
					backgroundColor: 'white',
					borderRadius: '12px',
					boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
					marginBottom: '30px',
				}}
			>
				<div style={{ position: 'relative' }}>
					{profile.avatar ? (
						<img
							src={avartarImage}
							alt="Profile"
							style={{
								width: '150px',
								height: '150px',
								borderRadius: '50%',
								objectFit: 'cover',
								border: '4px solid #e2e8f0',
							}}
						/>
					) : (
						<Avatar
							name={profile.name}
							size="150"
							round={true}
							color="#4f46e5"
							src={avartarImage}
						/>
					)}
					<button
						onClick={() => setIsEditing(!isEditing)}
						style={{
							position: 'absolute',
							bottom: '10px',
							right: '10px',
							backgroundColor: '#4f46e5',
							color: 'white',
							border: 'none',
							borderRadius: '50%',
							width: '40px',
							height: '40px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
							boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
						}}
					>
						<FiEdit size={18} />
					</button>
				</div>

				<div style={{ flex: 1 }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{isEditing ? (
							<input
								type="text"
								name="name"
								value={editData.name}
								onChange={handleEditChange}
								style={{
									fontSize: '28px',
									fontWeight: 700,
									border: '1px solid #e2e8f0',
									borderRadius: '4px',
									padding: '4px 8px',
									width: '60%',
								}}
							/>
						) : (
							<h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>
								{profile.name}
							</h1>
						)}

						{/* Changed from Follow button to Connections */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '6px',
								padding: '8px 12px',
								backgroundColor: '#f1f5f9',
								borderRadius: '8px',
								color: '#4f46e5',
							}}
						>
							<FiUsers size={18} />
							<span>{profile.connections} connections</span>
						</div>
					</div>

					<p style={{ color: '#64748b', margin: '8px 0' }}>
						@{profile.username}
					</p>

					{isEditing ? (
						<textarea
							name="bio"
							value={editData.bio}
							onChange={handleEditChange}
							style={{
								width: '100%',
								minHeight: '80px',
								padding: '8px',
								border: '1px solid #e2e8f0',
								borderRadius: '4px',
								margin: '12px 0 16px',
							}}
						/>
					) : (
						<p style={{ margin: '12px 0 16px' }}>{profile.bio}</p>
					)}

					{/* Edit action buttons when in edit mode */}
					{isEditing && (
						<div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
							<button
								onClick={handleSaveProfile}
								style={{
									padding: '8px 16px',
									backgroundColor: '#4f46e5',
									color: 'white',
									border: 'none',
									borderRadius: '6px',
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Save Changes
							</button>
							<button
								onClick={() => setIsEditing(false)}
								style={{
									padding: '8px 16px',
									backgroundColor: '#f1f5f9',
									color: '#64748b',
									border: 'none',
									borderRadius: '6px',
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Rest of the code remains exactly the same */}
			{/* Content Tabs */}
			<div
				style={{
					display: 'flex',
					borderBottom: '1px solid #e2e8f0',
					marginBottom: '20px',
				}}
			>
				<button
					onClick={() => setActiveTab('posts')}
					style={{
						padding: '12px 20px',
						backgroundColor: activeTab === 'posts' ? '#e0e7ff' : 'transparent',
						border: 'none',
						color: activeTab === 'posts' ? '#4f46e5' : '#64748b',
						fontWeight: 600,
						cursor: 'pointer',
						borderBottom: activeTab === 'posts' ? '2px solid #4f46e5' : 'none',
					}}
				>
					My Posts
				</button>
				<button
					onClick={() => setActiveTab('events')}
					style={{
						padding: '12px 20px',
						backgroundColor: activeTab === 'events' ? '#e0e7ff' : 'transparent',
						border: 'none',
						color: activeTab === 'events' ? '#4f46e5' : '#64748b',
						fontWeight: 600,
						cursor: 'pointer',
						borderBottom: activeTab === 'events' ? '2px solid #4f46e5' : 'none',
					}}
				>
					My Events
				</button>
				<button
					onClick={() => setActiveTab('saved')}
					style={{
						padding: '12px 20px',
						backgroundColor: activeTab === 'saved' ? '#e0e7ff' : 'transparent',
						border: 'none',
						color: activeTab === 'saved' ? '#4f46e5' : '#64748b',
						fontWeight: 600,
						cursor: 'pointer',
						borderBottom: activeTab === 'saved' ? '2px solid #4f46e5' : 'none',
					}}
				>
					Saved
				</button>
			</div>

			{/* Posts Section */}
			{activeTab === 'posts' && (
				<Grid container spacing={2}>
					{postsCreatedByMe().length > 0 ? (
						postsCreatedByMe()?.map((post) => (
							<Grid
								size={6}
								key={post.id}
								sx={{
									backgroundColor: 'white',
									borderRadius: '12px',
									padding: '20px',
									boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
								}}
							>
								<div
									style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}
								>
									{profile.avatar ? (
										<img
											src={avartarImage}
											alt="Profile"
											style={{
												width: '48px',
												height: '48px',
												borderRadius: '50%',
												objectFit: 'cover',
											}}
										/>
									) : (
										<Avatar
											name={post.createdBy}
											size="48"
											round={true}
											color="#4f46e5"
											src={avartarImage}
										/>
									)}
									<div>
										<div style={{ fontWeight: 600 }}>{post.createdBy}</div>
										<div style={{ color: '#64748b', fontSize: '14px' }}>
											{timeAgo(post.updatedAt)}
										</div>
									</div>
								</div>

								{/* <p style={{ marginBottom: '16px', lineHeight: 1.5 }}> */}
								{/* <pre style={{ marginBottom: '16px', lineHeight: 1.5 }}>
									{post.description}
								</pre> */}
								{/* </p> */}
								<pre
									className="description-container"
									style={{ paddingBottom: '1.5rem', marginBottom: '0.5rem' }}
								>
									<ExpandDescription text={post.description} />
								</pre>
								{post.imageUrl && (
									<img
										src={post.imageUrl}
										alt="Post content"
										style={{
											maxWidth: '100%',
											borderRadius: '8px',
											marginBottom: '16px',
										}}
									/>
								)}
								<div
									style={{
										display: 'flex',
										gap: '20px',
										borderTop: '1px solid #f1f5f9',
										paddingTop: '12px',
									}}
								>
									<button
										onClick={() => handleLike(post.id)}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '6px',
											backgroundColor: 'transparent',
											border: 'none',
											color: post.liked ? '#ef4444' : '#64748b',
											cursor: 'pointer',
										}}
									>
										<FiHeart fill={post.liked ? '#ef4444' : 'none'} />
										<span>{post.likes || 0}</span>
									</button>
									<button
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '6px',
											backgroundColor: 'transparent',
											border: 'none',
											color: '#64748b',
											cursor: 'pointer',
										}}
									>
										<FiMessageSquare />
										<span>{post.comments || 0}</span>
									</button>
									<button
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '6px',
											backgroundColor: 'transparent',
											border: 'none',
											color: '#64748b',
											cursor: 'pointer',
										}}
									>
										<FiShare2 />
										<span>Share</span>
									</button>
								</div>
								{/* </div> */}
							</Grid>
						))
					) : (
						<div
							style={{
								backgroundColor: '#e0e7ff',
								borderRadius: '12px',
								padding: '40px',
								textAlign: 'center',
								boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
							}}
						>
							<FiCalendar
								size={48}
								color="#cbd5e1"
								style={{ marginBottom: '16px' }}
							/>

							<h3 style={{ marginBottom: '8px' }}>No posts created yet</h3>
							<p style={{ color: '#64748b', margin: 0 }}>
								Create posts to view them here later
							</p>
						</div>
					)}
					{/* </div> */}
				</Grid>
			)}

			{/* Events Section */}
			{activeTab === 'events' && (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
						gap: '20px',
						alignItems: 'stretch', // This makes cards in the same row equal height
					}}
				>
					{eventsCreatedByMe().length > 0 ? (
						eventsCreatedByMe()?.map((event) => (
							<div
								key={event.id}
								style={{
									backgroundColor: 'white',
									borderRadius: '12px',
									overflow: 'hidden',
									boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
									display: 'flex',
									flexDirection: 'column',
									height: '100%', // Ensures all cards take full height of grid cell
								}}
							>
								<div
									style={{
										height: '120px',
										backgroundImage: `url(${event.url})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#4f46e5',
										fontSize: '24px',
										fontWeight: 700,
									}}
								>
									{!event?.url && <FiCalendar size={32} />}
								</div>
								<div
									style={{
										padding: '20px',
										flexGrow: 1, // Makes this section expand to fill available space
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<h3 style={{ margin: '0 0 8px' }}>{event.title}</h3>
									<div style={{ color: '#64748b', marginBottom: '8px' }}>
										{new Date(event.time).toLocaleDateString('en-US', {
											weekday: 'short',
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</div>
									<div style={{ color: '#64748b', marginBottom: '16px' }}>
										{event.location.location}
									</div>
									<div style={{ marginTop: 'auto' }}>
										{' '}
										{/* Pushes button to bottom */}
										<button
											onClick={() => toggleEventAttendance(event.id)}
											style={{
												width: '100%',
												padding: '8px',
												backgroundColor: event.attending ? '#4f46e5' : 'white',
												color: event.attending ? 'white' : '#4f46e5',
												border: `1px solid ${
													event.attending ? '#4f46e5' : '#c7d2fe'
												}`,
												borderRadius: '6px',
												fontWeight: 600,
												cursor: 'pointer',
												transition: 'all 0.2s',
											}}
										>
											{event.attending ? 'Attending ✓' : 'Attend Event'}
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<div
							style={{
								backgroundColor: '#e0e7ff',
								borderRadius: '12px',
								padding: '40px',
								textAlign: 'center',
								boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
								gridColumn: '1 / -1', // Makes the empty state span all columns
							}}
						>
							<FiCalendar
								size={48}
								color="#cbd5e1"
								style={{ marginBottom: '16px' }}
							/>
							<h3 style={{ marginBottom: '8px' }}>No events created yet</h3>
							<p style={{ color: '#64748b', margin: 0 }}>
								Create events to view them here later
							</p>
						</div>
					)}
				</div>
			)}
			{/* Saved Section */}
			{activeTab === 'saved' && (
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '12px',
						padding: '40px',
						textAlign: 'center',
						boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
					}}
				>
					<FiBookmark
						size={48}
						color="#cbd5e1"
						style={{ marginBottom: '16px' }}
					/>
					<h3 style={{ marginBottom: '8px' }}>No saved items yet</h3>
					<p style={{ color: '#64748b', margin: 0 }}>
						Save posts and events to view them here later
					</p>
				</div>
			)}
		</div>
	)
}

export default Profile
