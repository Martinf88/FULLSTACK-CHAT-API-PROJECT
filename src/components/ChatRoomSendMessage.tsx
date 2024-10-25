import { useState } from "react";

interface SendMessageProps {
	channelId: string;
	senderId: string;
	isLocked: boolean;
	isLoggedIn: boolean;
}


const SendMessage: React.FC<SendMessageProps> = ( {channelId, isLocked, isLoggedIn, senderId} ) => {
	const [messageContent, setMessageContent] = useState<string>("");

	const handleSendMessage = async () => {
		if (!messageContent.trim()) return;
	
		const token = localStorage.getItem("jwtToken");
	
		try {
		  const response = await fetch(`/api/messages/`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  Authorization: token || "",
			},
			body: JSON.stringify({
				content: messageContent,
				channelId,
				senderId,
			}),
		  });
	
		  if (response.ok) {
			setMessageContent(""); 
		  } else {
			console.error("Failed to send message");
		  }
		} catch (error) {
		  console.error("Error sending message:", error);
		}
	  };
	
	return (
		 (!isLocked || isLoggedIn) && (
			<div className="chat-room__send-message-wrapper">
				<input 
				className="chat-room__message-input" 
				type="text" 
				placeholder="write a message"
				value={messageContent}
				onChange={(e) => setMessageContent(e.target.value)} 
				/>
			  <button className="chat-room__send-btn" onClick={handleSendMessage}>
				<svg 
				xmlns="http://www.w3.org/2000/svg" 
				fill="none" 
				viewBox="0 0 24 24" 
				strokeWidth={1.5} 
				stroke="currentColor" 
				className="small-icon">
				<path 
				strokeLinecap="round" 
				strokeLinejoin="round" 
				d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
			  </svg>
  
				</button>
			</div>
  
			)
	)
}


export default SendMessage