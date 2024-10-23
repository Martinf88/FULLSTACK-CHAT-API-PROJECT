import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Message } from "../models/messageModel"

function ChatRoomPage() {
	const { channelId } = useParams<{ channelId: string }>()
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		const fetchMessages = async () => {
			const response = await fetch(`/api/messages/${channelId}`)
			const messages = await response.json();
			setMessages(messages)
			
		}
		
		fetchMessages()
	}, [channelId])

	return (
		<div className="chat-room-section">
			<Link to={'/'}>BACKA TEBAKS</Link>
			<h1>Hi, im a chatroom!</h1>

			<div>
				{messages.length > 0 ? (
					messages.map(message => <p key={message._id}> {message.content} </p>)
				) : (
					<p>No messages yet. Be the first Tarnished!</p>
				)}
			</div>
		</div>
	)
}

export default ChatRoomPage