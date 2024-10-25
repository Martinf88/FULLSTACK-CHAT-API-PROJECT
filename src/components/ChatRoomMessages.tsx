import { User } from "../models/userModel";
import { Message } from "../models/messageModel";

interface ChatRoomMessagesProps {
	messages: Message[];
	users: User[];
	isLoggedIn: boolean;
	messageError: string | null;
}

const ChatRoomMessages: React.FC<ChatRoomMessagesProps> = ( { messages, users, isLoggedIn, messageError } ) => {
	return (
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
					</div>
				);
			  })
			) : (
			  <p className="chat-room__empty-message">
				{isLoggedIn 
				   ? 'No messages yet. Be the first to send one!'
				   : messageError || 'You need to log in to see messages.'
				  }
			  </p>
			)}
		  </div>
	)
}

export default ChatRoomMessages