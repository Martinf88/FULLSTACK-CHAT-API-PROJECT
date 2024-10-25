import { useParams } from "react-router-dom"
import { useChatStore } from "../store/chatStore"
import { useAuthStore } from "../store/authStore"
import useUsers from "../hooks/useUsers";
import useChannels from "../hooks/useChannels";
import useMessages from "../hooks/useMessages"
import ChatRoomNavBar from "../components/ChatRoomNavBar";
import ChatRoomMessages from "../components/ChatRoomMessages";
import SendMessage from "../components/ChatRoomSendMessage";

// TODO: Feth messages again after posting

function ChatRoomPage() {
	const { channelId } = useParams<{ channelId: string }>()
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const channels = useChatStore(state => state.channels)
	const users = useAuthStore(state => state.users)
	const username = useAuthStore((state) => state.username);

	if (!channelId) {
        return <p>Error: Channel ID is required.</p>;
    }

	const { error: messageError, messages, isLoading: isMessagesLoading } = useMessages(channelId); 
	const { error: userError, isLoading: isUserLoading } = useUsers();
	const { error: channelError, isLoading: isChannelLoading } = useChannels();
	
	const channel = channels.find((ch) => ch._id === channelId)
	

	if (isMessagesLoading || isChannelLoading || isUserLoading) {
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

	const currentUser = users.find((user) => user.username === username);
	const senderId = currentUser ? currentUser._id : null;

	return (
		<div className="chat-room">
			<ChatRoomNavBar channelName={channel.name} />
			<ChatRoomMessages messages={messages} users={users} isLoggedIn={isLoggedIn} messageError={messageError} />
			{(!channel.isLocked || isLoggedIn) && senderId && (
				<SendMessage channelId={channelId} senderId={senderId} isLocked={channel.isLocked} isLoggedIn={isLoggedIn} />
			)}

		
		</div>
	  );
}

export default ChatRoomPage