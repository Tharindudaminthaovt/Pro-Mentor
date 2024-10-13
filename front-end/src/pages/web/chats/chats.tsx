/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import './chat.scss'
import { useGetChatHistory } from '../../../hooks/web/chats/useGetChatHistory'

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
		console.log(item)
		item.newMessageCount = undefined
		setSelectedChat(item)
		setChatHistoryUser({
			currentUserName: sessionHandler.getSession('username'),
			resipiant: item.username,
		})
	}

	const onMessageSend = (message: string, to: string) => {
		console.log(message)
		setLocalMessageList((previousList) => [
			...previousList,
			{
				message: message,
				reserved: false,
			},
		])

		const updatedUsers = users?.map((item) => {
			if (item.username === to) {
				return {
					username: item.username,
					name: item.name,
					newMessageCount: undefined,
					latestMessageTime: new Date(),
					latestMessage: message,
				}
			}

			return item
		})

		setUsers(updatedUsers)
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
		if (users && users?.length > 0) setSelectedChatHandler(users[0])
	}, [users])

	useEffect(() => {
		if (latestMessage) {
			let updatedUsers

			if (latestMessage.from === selectedChat?.username) {
				setLocalMessageList((pre) => [
					...pre,
					{
						message: latestMessage.message,
						reserved: true,
					},
				])

				updatedUsers = users?.map((item) => {
					if (item.username === latestMessage.from) {
						return {
							username: item.username,
							name: item.name,
							newMessageCount: undefined,
							latestMessageTime: latestMessage.timestamp,
							latestMessage: latestMessage.message,
						}
					}

					return item
				})
			} else {
				updatedUsers = users?.map((item) => {
					if (item.username === latestMessage.from) {
						return {
							username: item.username,
							name: item.name,
							newMessageCount: item.newMessageCount
								? item.newMessageCount + 1
								: 1,
							latestMessageTime: latestMessage.timestamp,
							latestMessage: latestMessage.message,
						}
					}

					return item
				})
			}

			setUsers(updatedUsers)
		}
	}, [latestMessage])

	useEffect(() => {
		const historyMessageList: ChatMessage[] = historyMessages.map((item) => ({
			message: item.message,
			reserved: item.from === selectedChat?.username,
		}))

		setLocalMessageList(historyMessageList)
	}, [historyMessages])

	return (
		<>
			<div className="page chat-page">
				<div className="content-chat">
					<div className="chat-container">
						{users &&
							users.map((item) => (
								<ChatsItem
									key={item.username}
									item={item}
									setSelectedChat={setSelectedChatHandler}
								/>
							))}
					</div>
					{selectedChat && (
						<SelectedChatItem
							chatSelected={selectedChat}
							currentUser={sessionHandler.getSession('username')}
							onMessageSend={onMessageSend}
							localMessageList={localMessageList}
						/>
					)}
				</div>
				{latestMessage && latestMessage?.message}
			</div>
		</>
	)
}

export default Chats