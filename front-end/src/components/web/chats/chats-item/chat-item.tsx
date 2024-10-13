import { Card } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import "./chat-item.scss"

export interface ChatUserItem {
	username: string;
    name: string;
	newMessageCount?: number,
	latestMessage?: string,
	latestMessageTime?: Date
}

type Props = {
	item: ChatUserItem
	setSelectedChat?: (item: ChatUserItem) => void,
	
}

function ChatsItem({ 
    item, 
    setSelectedChat,
}: Props) {

	return (
		<Card
			className="chat-item"
			onClick={() => (setSelectedChat ? setSelectedChat(item) : undefined)}
		>
			<div className="chat-logo">
				<Avatar
					name={item.name}
					className="rounded-circle avatar"
					size="40"
				/>
			</div>
			<div className="data">
                <div className="left-data">
                    <div className="name">{item.name}</div>
                    {/* <div className="company-name">{"text company"}</div> */}
                    <div className="last-message">{item?.latestMessage}</div>
                </div>
				<div className='side-content'>
                    <div className="times-ago">{item?.latestMessageTime && timeAgo(item.latestMessageTime.toISOString())}</div>
                    {
						item?.newMessageCount &&
						(
							<div className='counter-wrapper'>
								<div className="count">{item.newMessageCount}</div>
							</div>
						)
					}
                </div>
			</div>
		</Card>
	)
}

export default ChatsItem