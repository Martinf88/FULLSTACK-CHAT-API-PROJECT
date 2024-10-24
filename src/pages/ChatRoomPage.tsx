import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Message } from "../models/messageModel"
import { useChatStore } from "../store/chatStore"
import { useAuthStore } from "../store/authStore"
import useUsers from "../hooks/useUsers";
import useChannels from "../hooks/useChannels";


// TODO: move useEffect to a custom hook
// TODO: move messages to chatStore

function ChatRoomPage() {
	const { channelId } = useParams<{ channelId: string }>()
	const [messages, setMessages] = useState<Message[]>([])
	const [error, setError] = useState<string | null>(null);
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const channels = useChatStore(state => state.channels)
	const users = useAuthStore(state => state.users)

	
	const { error: userError, isLoading: isUserLoading } = useUsers();
	const { error: channelError, isLoading: isChannelLoading } = useChannels();
	
	const channel = channels.find((ch) => ch._id === channelId)
	
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

	if (isChannelLoading || isUserLoading) {
		return <p>Loading data...</p>;
	}

	if (channelError || userError) {
		return <p>Error: {channelError || userError}</p>;
	}

	if (!channel) {
		return (
			<div className="chat-room">
				<p>Channel not found.</p>
			</div>
		);
	}

	return (
		<div className="chat-room">
			<div className="chat-room__nav-wrapper">
		  <Link to={'/'} className="chat-room__link">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="small-icon">
			  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
		  </Link>
		  <h1 className="chat-room__title">{channel.name}</h1>

			</div>
	
		  <div className="chat-room__messages">
			{messages.length > 0 ? (
			  messages.map(message => {

				const user = users.find(user => user._id === message.senderId);

				return (
					<div key={message._id}  className="chat-room__message-wrapper">
				 		 <p className="chat-room__message">
							<span className="chat-room__user">
							{user ? user.username : 'Unknown User'}
							</span>
							<span className="chat-room__content">
							{message.content}
							</span>
				 		 </p>
						<p className="chat-room__message-timestamp"> {message.timestamp} </p>
					</div>
				);
			  })
			) : (
			  <p className="chat-room__empty-message">
				{isLoggedIn 
				  ? 'No messages yet. Be the first to send one!' 
				  : error}
			  </p>
			)}
		  </div>
		  <div className="chat-room__send-message-wrapper">
		 	 <input className="chat-room__message-input" type="text" placeholder="write a message" />
			<button className="chat-room__send-btn">
			  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="small-icon">
  				<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
			</svg>

			  </button>
		  </div>
		</div>
	  );
}

export default ChatRoomPage