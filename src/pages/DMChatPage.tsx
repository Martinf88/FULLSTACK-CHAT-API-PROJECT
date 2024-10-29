import { Link } from "react-router-dom"
import SendMessage from "../components/ChatRoomSendMessage"
import { useAuthStore } from "../store/authStore"
import useDirectMessages from "../hooks/useDirectMessages";

function DMChatPage() {
	const users = useAuthStore(state => state.users)
	const username = useAuthStore((state) => state.username);
	const receiverId = useAuthStore((state) => state.receiverId)
	
	const currentUser = users.find((user) => user.username === username);
	const senderId = currentUser ? currentUser._id : null;

	if(!senderId || !receiverId) {
		return
	}
	const { error: messageError, messages, isLoading: isMessagesLoading, fetchDirectMessages, } = useDirectMessages(senderId, receiverId); 

	if (isMessagesLoading) {
		return <p>Loading data...</p>;
	}

	console.log('Fetched messages:', messages);
	
	return (
		<div>
			<Link to={'/'}>BACKA TEBAKS</Link>
			<h1>Hello i'm a DM chat!</h1>
			{messages.map(message => 
				<div key={message._id}>
					<p> {message.receiverId} </p>
					<p> {message.senderId} </p>
					<p> {message.content} </p>
				</div>
			)}
			<SendMessage senderId={senderId} receiverId={receiverId} refreshMessages={fetchDirectMessages} />
		</div>
	)
}

export default DMChatPage