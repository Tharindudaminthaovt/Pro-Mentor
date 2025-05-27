// import { Button, Card, Form } from 'react-bootstrap'
// import Avatar from 'react-avatar'
// import * as yup from 'yup'
// import { ChatUser } from '../../../../hooks/web/chats/useChatUserCreate'
// import { yupResolver } from '@hookform/resolvers/yup'
// import './selected-chat-item.scss'
// import { Controller, useForm } from 'react-hook-form'
// import { useMessageCreate } from '../../../../hooks/web/chats/useMessageCreate'
// import { generateAvatarImage } from '../../../../utils/profileAvatarGenerator'

// const schema = yup.object().shape({
// 	message: yup.string().required('message is required'),
// })

// export interface IMessage {
// 	message: string
// }

// export interface ChatMessage {
// 	message: string
// 	reserved: boolean
// }

// type Props = {
// 	chatSelected: ChatUser
// 	currentUser: string
// 	onMessageSend: (message: string, to: string) => void
// 	localMessageList: ChatMessage[]
// }

// const SelectedChatItem = ({
// 	chatSelected,
// 	currentUser,
// 	onMessageSend,
// 	localMessageList,
// }: Props) => {
// 	const {
// 		handleSubmit,
// 		control,
// 		formState: { errors },
// 		reset,
// 	} = useForm({
// 		resolver: yupResolver(schema),
// 	})

// 	const { setMessage } = useMessageCreate()
// 	const avartarImage = generateAvatarImage(chatSelected?.username)

// 	const onSubmit = (data: IMessage) => {
// 		console.log(data)
// 		if (data?.message) {
// 			setMessage({
// 				from: currentUser,
// 				to: chatSelected.username,
// 				message: data.message,
// 			})
// 			onMessageSend(data.message, chatSelected.username)
// 		}
// 		reset()
// 	}
// 	return (
// 		<Card className="selected-chat">
// 			<div className="selected-top-row">
// 				<div className="user-pic">
// 					<Avatar
// 						name={chatSelected.name}
// 						className="rounded-circle avatar"
// 						size="60"
// 						src={avartarImage}
// 					/>
// 					<div className="title-section">
// 						<div className="title">{chatSelected.name}</div>
// 						{/* <div className="company-name">{jobDetails.companyName}</div> */}
// 					</div>
// 				</div>
// 			</div>
// 			<div className="chat-contenct">
// 				{localMessageList &&
// 					localMessageList.map(
// 						(item, index) => {
// 							if (item.reserved) {
// 								return (
// 									<div key={index} className="msg received-msg">
// 										{/* <div>{'from'}</div> */}
// 										<div>{item.message}</div>
// 									</div>
// 								)
// 							} else {
// 								return (
// 									<div key={index} className="msg sent-msg">
// 										{/* <div className="you">{'you'}</div> */}
// 										<div>{item.message}</div>
// 									</div>
// 								)
// 							}
// 						}

// 						// <div key={index}>
// 						// 	<div>{item.reserved ? 'from' : 'me'}</div>
// 						// 	<div>{item.message}</div>
// 						// </div>
// 					)}
// 			</div>
// 			<div>
// 				<Form onSubmit={handleSubmit(onSubmit)} className="send-form">
// 					<Form.Group controlId="message" className="form-div">
// 						<Controller
// 							name="message"
// 							control={control}
// 							defaultValue=""
// 							render={({ field }) => (
// 								<Form.Control
// 									{...field}
// 									type="text"
// 									placeholder="Type a Message..."
// 								/>
// 							)}
// 						/>
// 						<Form.Text className="text-danger">
// 							{errors.message?.message}
// 						</Form.Text>
// 					</Form.Group>
// 					<Button variant="primary" type="submit">
// 						Send
// 					</Button>
// 				</Form>
// 			</div>
// 		</Card>
// 	)
// }

// export default SelectedChatItem

import { Button, Card, Form, Image, Badge } from 'react-bootstrap'
import { FiSend, FiMoreVertical, FiChevronLeft } from 'react-icons/fi'
import * as yup from 'yup'
import { ChatUser } from '../../../../hooks/web/chats/useChatUserCreate'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMessageCreate } from '../../../../hooks/web/chats/useMessageCreate'
import { generateAvatarImage } from '../../../../utils/profileAvatarGenerator'
import './selected-chat-item.scss'
import { useEffect, useRef } from 'react'

const schema = yup.object().shape({
	message: yup.string().required('Message is required'),
})

export interface IMessage {
	message: string
}

export interface ChatMessage {
	message: string
	reserved: boolean
	timestamp?: string
}

type Props = {
	chatSelected: ChatUser
	currentUser: string
	onMessageSend: (message: string, to: string) => void
	localMessageList: ChatMessage[]
	onBack?: () => void // For mobile back button
}

const SelectedChatItem = ({
	chatSelected,
	currentUser,
	onMessageSend,
	localMessageList,
	onBack,
}: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	})

	const { setMessage } = useMessageCreate()
	const avatarImage = generateAvatarImage(chatSelected?.username)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Auto-scroll to bottom when messages change
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [localMessageList])

	const onSubmit = (data: IMessage) => {
		if (data?.message) {
			setMessage({
				from: currentUser,
				to: chatSelected.username,
				message: data.message,
			})
			onMessageSend(data.message, chatSelected.username)
		}
		reset()
	}

	return (
		<Card
			className="selected-chat"
			style={{
				border: '1px solid #F1F5F9',
				borderRadius: '16px',
				boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Chat Header */}
			<div
				style={{
					padding: '1rem',
					borderBottom: '1px solid #F1F5F9',
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				{onBack && (
					<button
						onClick={onBack}
						style={{
							background: 'none',
							border: 'none',
							cursor: 'pointer',
							padding: '0.5rem',
						}}
					>
						<FiChevronLeft size={20} />
					</button>
				)}
				<Image
					src={avatarImage}
					roundedCircle
					style={{
						width: '48px',
						height: '48px',
						objectFit: 'cover',
						border: '2px solid #F1F5F9',
					}}
				/>
				<div style={{ flex: 1 }}>
					<h5
						style={{
							color: '#1E293B',
							fontWeight: '600',
							marginBottom: '0.1rem',
						}}
					>
						{chatSelected.name}
					</h5>
					<Badge
						bg="light"
						text="success"
						style={{
							fontSize: '0.65rem',
							fontWeight: '500',
							padding: '0.25rem 0.5rem',
						}}
					>
						Online
					</Badge>
				</div>
				<button
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						padding: '0.5rem',
					}}
				>
					<FiMoreVertical />
				</button>
			</div>

			{/* Messages Area */}
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					padding: '1rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					backgroundColor: '#F8FAFC',
				}}
			>
				{localMessageList.length > 0 ? (
					localMessageList.map((item, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: item.reserved ? 'flex-start' : 'flex-end',
							}}
						>
							<div
								style={{
									backgroundColor: item.reserved ? '#FFFFFF' : '#8B5CF6',
									color: item.reserved ? '#1E293B' : '#FFFFFF',
									padding: '0.75rem 1rem',
									borderRadius: item.reserved
										? '0 12px 12px 12px'
										: '12px 0 12px 12px',
									maxWidth: '75%',
									boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
								}}
							>
								<p style={{ marginBottom: 0 }}>{item.message}</p>
								{item.timestamp && (
									<div
										style={{
											textAlign: 'right',
											fontSize: '0.65rem',
											color: item.reserved
												? '#64748B'
												: 'rgba(255, 255, 255, 0.7)',
											marginTop: '0.25rem',
										}}
									>
										{new Date(item.timestamp).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</div>
								)}
							</div>
						</div>
					))
				) : (
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#64748B',
						}}
					>
						<p>No messages yet. Start the conversation!</p>
					</div>
				)}
				{/* Empty div at the bottom for auto-scrolling */}
				<div ref={messagesEndRef} />
			</div>

			{/* Message Input */}
			<div
				style={{
					padding: '1rem',
					borderTop: '1px solid #F1F5F9',
				}}
			>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						<Controller
							name="message"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									{...field}
									type="text"
									placeholder="Type a message..."
									style={{
										borderRadius: '12px',
										border: '1px solid #E2E8F0',
										padding: '0.75rem 1rem',
										flex: 1,
									}}
									isInvalid={!!errors.message}
								/>
							)}
						/>
						<Button
							type="submit"
							style={{
								background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
								border: 'none',
								borderRadius: '12px',
								padding: '0 1.5rem',
								fontWeight: '600',
								color: '#FFFFFF',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
							}}
						>
							<FiSend size={18} />
						</Button>
					</div>
					{errors.message && (
						<Form.Text className="text-danger" style={{ fontSize: '0.75rem' }}>
							{errors.message.message}
						</Form.Text>
					)}
				</Form>
			</div>
		</Card>
	)
}

export default SelectedChatItem
