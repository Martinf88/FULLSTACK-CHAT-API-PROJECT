import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Message } from "../models/messageModel"
import { useChatStore } from "../store/chatStore"

function ChatRoomPage() {
	const { channelId } = useParams<{ channelId: string }>()
	const [messages, setMessages] = useState<Message[]>([])
	const [error, setError] = useState<string | null>(null);
	const isLoggedIn = useChatStore(state => state.isLoggedIn)

	useEffect(() => {
		const fetchMessages = async () => {
			const token = localStorage.getItem('jwtToken')

			try {
                const response = await fetch(`/api/messages/${channelId}`, {
                    headers: {
                        Authorization: token ? token : '',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Channel not found.");
                    } else if (response.status === 403) {
                        setError("You do not have access to this channel.");
                    } else {
                        setError("Failed to fetch messages.");
                    }
                    return;
                }

                const messages = await response.json();
                setMessages(messages);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError("An error occurred while fetching messages.");
            }
			
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