// import { Card } from 'react-bootstrap'
// import Avatar from 'react-avatar'
// import { timeAgo } from '../../../../utils/dateTImeHandler'
// import './chat-item.scss'
// import { generateAvatarImage } from '../../../../utils/profileAvatarGenerator'

// export interface ChatUserItem {
// 	username: string
// 	name: string
// 	newMessageCount?: number
// 	latestMessage?: string
// 	latestMessageTime?: Date
// }

// type Props = {
// 	item: ChatUserItem
// 	setSelectedChat?: (item: ChatUserItem) => void
// }

// function ChatsItem({ item, setSelectedChat }: Props) {
// 	const avartarImage = generateAvatarImage(item?.username)

// 	return (
// 		<Card
// 			className="chat-item"
// 			onClick={() => (setSelectedChat ? setSelectedChat(item) : undefined)}
// 		>
// 			<div className="chat-logo">
// 				<Avatar
// 					name={item.name}
// 					className="rounded-circle avatar"
// 					size="40"
// 					src={avartarImage}
// 				/>
// 			</div>
// 			<div className="data">
// 				<div className="left-data">
// 					<div className="name">{item.name}</div>
// 					{/* <div className="company-name">{"text company"}</div> */}
// 					<div className="last-message">{item?.latestMessage}</div>
// 				</div>
// 				<div className="side-content">
// 					<div className="times-ago">
// 						{item?.latestMessageTime &&
// 							timeAgo(item.latestMessageTime.toISOString())}
// 					</div>
// 					{item?.newMessageCount && (
// 						<div className="counter-wrapper">
// 							<div className="count">{item.newMessageCount}</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</Card>
// 	)
// }

// export default ChatsItem

import { Card } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import { generateAvatarImage } from '../../../../utils/profileAvatarGenerator'
import { FiMessageSquare } from 'react-icons/fi'
import './chat-item.scss'

export interface ChatUserItem {
	username: string
	name: string
	newMessageCount?: number
	latestMessage?: string
	latestMessageTime?: Date
}

type Props = {
	item: ChatUserItem
	setSelectedChat?: (item: ChatUserItem) => void
	isActive?: boolean
}

function ChatsItem({ item, setSelectedChat, isActive = false }: Props) {
	const avatarImage = generateAvatarImage(item?.username)

	return (
		<Card
			className="chat-item"
			onClick={() => (setSelectedChat ? setSelectedChat(item) : undefined)}
			style={{
				border: 'none',
				borderRadius: '12px',
				backgroundColor: isActive ? '#F8FAFC' : '#FFFFFF',
				cursor: 'pointer',
				transition: 'all 0.2s ease',
				marginBottom: '0.5rem',
				borderLeft: isActive ? '4px solid #8B5CF6' : 'none',
				':hover': {
					backgroundColor: '#F8FAFC',
				},
			}}
		>
			<Card.Body
				style={{
					padding: '1rem',
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<div>
					<Avatar
						name={item.name}
						className="rounded-circle avatar"
						size="48"
						src={avatarImage}
						style={{
							border: '2px solid #F1F5F9',
							objectFit: 'cover',
						}}
					/>
				</div>
				<div
					style={{
						flex: 1,
						minWidth: 0, // Needed for text truncation
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '0.25rem',
						}}
					>
						<h5
							style={{
								color: '#1E293B',
								fontWeight: '600',
								fontSize: '0.875rem',
								marginBottom: 0,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.name}
						</h5>
						{item?.latestMessageTime && (
							<span
								style={{
									color: '#64748B',
									fontSize: '0.75rem',
									whiteSpace: 'nowrap',
									marginLeft: '0.5rem',
								}}
							>
								{timeAgo(item.latestMessageTime.toISOString())}
							</span>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<p
							style={{
								color: '#64748B',
								fontSize: '0.75rem',
								marginBottom: 0,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								flex: 1,
							}}
						>
							{item?.latestMessage || (
								<span style={{ fontStyle: 'italic' }}>No messages yet</span>
							)}
						</p>
						{item?.newMessageCount && (
							<span
								style={{
									backgroundColor: '#8B5CF6',
									color: '#FFFFFF',
									borderRadius: '50%',
									width: '20px',
									height: '20px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '0.65rem',
									marginLeft: '0.5rem',
								}}
							>
								{item.newMessageCount}
							</span>
						)}
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default ChatsItem
