import { Button, Card, Form } from 'react-bootstrap'
import Avatar from 'react-avatar'
import * as yup from 'yup'
import { ChatUser } from '../../../../hooks/web/chats/useChatUserCreate'
import { yupResolver } from '@hookform/resolvers/yup'
import './selected-chat-item.scss'
import { Controller, useForm } from 'react-hook-form'
import { useMessageCreate } from '../../../../hooks/web/chats/useMessageCreate'

const schema = yup.object().shape({
	message: yup.string().required('message is required'),
})

export interface IMessage {
	message: string
}

export interface ChatMessage {
	message: string
	reserved: boolean
}

type Props = {
	chatSelected: ChatUser
	currentUser: string
	onMessageSend: (message: string, to: string) => void
	localMessageList: ChatMessage[]
}

const SelectedChatItem = ({
	chatSelected,
	currentUser,
	onMessageSend,
	localMessageList,
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

	const onSubmit = (data: IMessage) => {
		console.log(data)
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
		<Card className="selected-chat">
			<div className="selected-top-row">
				<div className="user-pic">
					<Avatar
						name={chatSelected.name}
						className="rounded-circle avatar"
						size="60"
					/>
					<div className="title-section">
						<div className="title">{chatSelected.name}</div>
						{/* <div className="company-name">{jobDetails.companyName}</div> */}
					</div>
				</div>
			</div>
			<div className="chat-contenct">
				{localMessageList &&
					localMessageList.map(
						(item, index) => {
							if (item.reserved) {
								return (
									<div key={index} className="msg received-msg">
										{/* <div>{'from'}</div> */}
										<div>{item.message}</div>
									</div>
								)
							} else {
								return (
									<div key={index} className="msg sent-msg">
										{/* <div className="you">{'you'}</div> */}
										<div>{item.message}</div>
									</div>
								)
							}
						}

						// <div key={index}>
						// 	<div>{item.reserved ? 'from' : 'me'}</div>
						// 	<div>{item.message}</div>
						// </div>
					)}
			</div>
			<div>
				<Form onSubmit={handleSubmit(onSubmit)} className="send-form">
					<Form.Group controlId="message" className="form-div">
						<Controller
							name="message"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									{...field}
									type="text"
									placeholder="Type a Message..."
								/>
							)}
						/>
						<Form.Text className="text-danger">
							{errors.message?.message}
						</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Send
					</Button>
				</Form>
			</div>
		</Card>
	)
}

export default SelectedChatItem