import React, { useEffect, useState, useMemo } from 'react'
import ChatsItem, {
	ChatUserItem,
} from '../../../components/web/chats/chats-item/chat-item'
import SelectedChatItem, {
	ChatMessage,
} from '../../../components/web/chats/selected-chat-item/selected-chat-item'
import { SessionHandler } from '../../../utils/session-handler'
import {
	ChatUser,
	useChatUserCreate,
} from '../../../hooks/web/chats/useChatUserCreate'
import { useGetAllChatUsers } from '../../../hooks/web/chats/useGetAllChatUsers'
import { useRetriveMessages } from '../../../hooks/web/chats/useRetriveMessages'
import { useGetChatHistory } from '../../../hooks/web/chats/useGetChatHistory'
import { Card, Badge } from 'react-bootstrap'
import { generateAvatarImage } from '../../../utils/profileAvatarGenerator'
import { FiMessageSquare } from 'react-icons/fi'

const sessionHandler = new SessionHandler()

const Chats = () => {
	const [users, setUsers] = useState<ChatUserItem[]>()
	const [selectedChat, setSelectedChat] = useState<ChatUser>()
	const [localMessageList, setLocalMessageList] = useState<ChatMessage[]>([])

	const {} = useChatUserCreate({
		username: sessionHandler.getSession('username'),
		name: sessionHandler.getSession('name'),
	})

	const { setChatHistoryUser, historyMessages } = useGetChatHistory()

	const setSelectedChatHandler = (item: ChatUserItem) => {
		const updatedUsers = users?.map((user) =>
			user.username === item.username
				? { ...user, newMessageCount: undefined }
				: user
		)
		setUsers(updatedUsers)
		setSelectedChat(item)
		setChatHistoryUser({
			currentUserName: sessionHandler.getSession('username'),
			resipiant: item.username,
		})
	}

	const onMessageSend = (message: string, to: string) => {
		setLocalMessageList((prev) => [...prev, { message, reserved: false }])

		// Update the sender's latest message without changing order
		setUsers(
			(prevUsers) =>
				prevUsers?.map((user) =>
					user.username === to
						? {
								...user,
								latestMessageTime: new Date(),
								latestMessage: message,
								newMessageCount: undefined,
							}
						: user
				)
		)
	}

	const { chatUsers } = useGetAllChatUsers(
		sessionHandler.getSession('username')
	)
	const { latestMessage } = useRetriveMessages(
		sessionHandler.getSession('username')
	)

	useEffect(() => {
		setUsers(chatUsers)
	}, [chatUsers])

	useEffect(() => {
		if (users && users.length > 0 && !selectedChat) {
			setSelectedChatHandler(users[0])
		}
	}, [users])

	useEffect(() => {
		if (latestMessage) {
			// Update message list
			if (latestMessage.from === selectedChat?.username) {
				setLocalMessageList((prev) => [
					...prev,
					{ message: latestMessage.message, reserved: true },
				])
			}

			// Update users list without reordering
			setUsers(
				(prevUsers) =>
					prevUsers?.map((user) => {
						if (user.username === latestMessage.from) {
							const isCurrentChat =
								latestMessage.from === selectedChat?.username
							return {
								...user,
								newMessageCount: isCurrentChat
									? undefined
									: (user.newMessageCount || 0) + 1,
								latestMessageTime: latestMessage.timestamp,
								latestMessage: latestMessage.message,
							}
						}
						return user
					})
			)
		}
	}, [latestMessage])

	useEffect(() => {
		const historyMessageList: ChatMessage[] = historyMessages.map((item) => ({
			message: item.message,
			reserved: item.from === selectedChat?.username,
		}))
		setLocalMessageList(historyMessageList)
	}, [historyMessages, selectedChat?.username])

	const sortedUsers = useMemo(() => {
		if (!users) return []
		// Create a new array for sorting to avoid mutating state
		return [...users].sort((a, b) => {
			// Keep selected chat at top if it exists
			if (selectedChat) {
				if (a.username === selectedChat.username) return -1
				if (b.username === selectedChat.username) return 1
			}
			// Then sort by latest message time
			const timeA = a.latestMessageTime
				? new Date(a.latestMessageTime).getTime()
				: 0
			const timeB = b.latestMessageTime
				? new Date(b.latestMessageTime).getTime()
				: 0
			return timeB - timeA
		})
	}, [users, selectedChat])

	return (
		<div
			style={{
				backgroundColor: '#F8FAFC',
				padding: '24px',
				height: '100vh',
				boxSizing: 'border-box',
			}}
		>
			<div
				style={{
					display: 'flex',
					height: '100%',
					gap: '24px',
					margin: '0 auto',
				}}
			>
				{/* Chat List Sidebar */}
				<div
					style={{
						width: '360px',
						minWidth: '360px',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#FFFFFF',
						borderRadius: '16px',
						border: '1px solid #F1F5F9',
						boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
						overflow: 'hidden',
					}}
				>
					{/* Chat List Header */}
					<div
						style={{
							padding: '16px 20px',
							borderBottom: '1px solid #F1F5F9',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<h3
							style={{
								color: '#1E293B',
								fontWeight: '600',
								margin: 0,
								fontSize: '18px',
							}}
						>
							Messages
						</h3>
					</div>

					{/* Chat List */}
					<div
						style={{
							flex: 1,
							overflowY: 'auto',
							padding: '8px 0',
						}}
					>
						{sortedUsers.map((item) => {
							const avatarImage = generateAvatarImage(item.username)
							const isActive = selectedChat?.username === item.username

							return (
								<div
									key={`${item.username}-${item.latestMessageTime}`}
									onClick={() => setSelectedChatHandler(item)}
									style={{
										display: 'flex',
										alignItems: 'center',
										padding: '12px 16px',
										gap: '12px',
										cursor: 'pointer',
										backgroundColor: isActive ? '#F8FAFC' : 'transparent',
										transition: 'background-color 0.2s',
										':hover': {
											backgroundColor: '#F8FAFC',
										},
									}}
								>
									<img
										src={avatarImage}
										alt={item.name}
										style={{
											width: '48px',
											height: '48px',
											borderRadius: '50%',
											objectFit: 'cover',
											border: '2px solid #F1F5F9',
										}}
									/>
									<div style={{ flex: 1, minWidth: 0 }}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginBottom: '4px',
											}}
										>
											<h4
												style={{
													color: '#1E293B',
													fontWeight: '600',
													margin: 0,
													fontSize: '14px',
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												{item.name}
											</h4>
											{item.latestMessageTime && (
												<span
													style={{
														color: '#94A3B8',
														fontSize: '12px',
														whiteSpace: 'nowrap',
														marginLeft: '8px',
													}}
												>
													{new Date(item.latestMessageTime).toLocaleTimeString(
														[],
														{
															hour: '2-digit',
															minute: '2-digit',
														}
													)}
												</span>
											)}
										</div>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '8px',
											}}
										>
											<p
												style={{
													color: '#64748B',
													fontSize: '13px',
													margin: 0,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													flex: 1,
												}}
											>
												{item.latestMessage || 'No messages yet'}
											</p>
											{item.newMessageCount && (
												<span
													style={{
														backgroundColor: '#8B5CF6',
														color: '#FFFFFF',
														fontSize: '12px',
														fontWeight: '500',
														minWidth: '20px',
														height: '20px',
														borderRadius: '10px',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														padding: '0 6px',
													}}
												>
													{item.newMessageCount}
												</span>
											)}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>

				{/* Selected Chat Area */}
				{selectedChat ? (
					<SelectedChatItem
						chatSelected={selectedChat}
						currentUser={sessionHandler.getSession('username')}
						onMessageSend={onMessageSend}
						localMessageList={localMessageList}
					/>
				) : (
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#FFFFFF',
							borderRadius: '16px',
							border: '1px solid #F1F5F9',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
						}}
					>
						<div
							style={{
								textAlign: 'center',
								padding: '40px',
								maxWidth: '400px',
							}}
						>
							<div
								style={{
									backgroundColor: '#F1F5F9',
									width: '80px',
									height: '80px',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '0 auto 24px',
								}}
							>
								<FiMessageSquare size={32} color="#64748B" />
							</div>
							<h3
								style={{
									color: '#1E293B',
									fontWeight: '600',
									marginBottom: '12px',
									fontSize: '20px',
								}}
							>
								Select a conversation
							</h3>
							<p
								style={{
									color: '#64748B',
									marginBottom: 0,
									fontSize: '14px',
									lineHeight: '1.5',
								}}
							>
								Choose from your existing conversations or start a new one to
								begin messaging
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Chats
