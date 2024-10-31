import { Link } from "react-router-dom"
import SendMessage from "../components/chatroom/ChatRoomSendMessage"
import { useAuthStore } from "../store/authStore"
import useDirectMessages from "../hooks/useDirectMessages";
import { DirectMessage } from "../models/DmModel";

function DMChatPage() {
	const users = useAuthStore(state => state.users)
	const receiverId = useAuthStore(state => state.receiverId)
	const username = localStorage.getItem("username");

	
	const currentUser = users.find((user) => user.username === username);
	const currentReceiver = users.find(user => user._id === receiverId);
	const senderId = currentUser ? currentUser._id : null;

	
	if(!senderId || !receiverId) {
		return (
			<div>
				<Link to={'/channels'}>go back</Link>
				<p>Please select a user to chat with.</p>;
			</div>
			
		)
	}

	const { error, directMessages, isLoading, refetch } = useDirectMessages(senderId, receiverId); 


	if (isLoading) {
		return (
			<div>
				<Link to={'/channels'}>go back</Link>
				<p>Loading data...</p>
			</div>
		);
	}
	
	if (error) {
		return (
			<div>
				<Link to={'/channels'}>go back</Link>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="dm-chat-page">
		<Link to={'/channels'} className="dm-chat-page__back-link">BACK TO CHANNELS</Link>
		<h1 className="dm-chat-page__header"> {currentReceiver ? currentReceiver.username : "Unknown User"} </h1>
		<div className="dm-chat-page__messages-container">
			{directMessages.map((directMessage: DirectMessage) => {
				const sender = users.find(user => user._id === directMessage.senderId);
				const isCurrentUserSender = directMessage.senderId === senderId;
				const displayName = isCurrentUserSender ? "You" : (sender?.username || "Unknown User");

				return (
					<div key={directMessage._id} className={`dm-chat-page__message-card dm-chat-page__message-card--${isCurrentUserSender ? 'sent' : 'received'}`}>
						<div className="dm-chat-page__message-header">
							<span className="ddm-chat-page__display-name">{displayName}</span>
						</div>
						<div className="dm-chat-page__message-content">
							<p>{directMessage.content}</p>
						</div>
					</div>
				);
			})}
		</div>
		<SendMessage senderId={senderId} receiverId={receiverId} refreshMessages={refetch} />
			</div>
	</div>
    );
}

export default DMChatPage