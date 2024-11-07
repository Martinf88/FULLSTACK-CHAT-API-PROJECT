import { Link, useParams } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import useUsers from "../hooks/useUsers";
import useChannels from "../hooks/useChannels";
import useMessages from "../hooks/useMessages";
import ChatRoomNavBar from "../components/navigation/ChatRoomNavBar";
import ChatRoomMessages from "../components/chatroom/ChatRoomMessages";
import SendMessage from "../components/chatroom/ChatRoomSendMessage";

function ChatRoomPage() {
  const { channelId } = useParams<{ channelId: string }>();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const channels = useChatStore((state) => state.channels);
  const users = useAuthStore((state) => state.users);
  const username = useAuthStore((state) => state.username);

  if (!channelId) {
    return <p>Error: Channel ID is required.</p>;
  }

  const {
    error: messageError,
    messages,
    isLoading: isMessagesLoading,
    fetchMessages,
  } = useMessages(channelId);
  const { error: userError, isLoading: isUserLoading } = useUsers();
  const { error: channelError, isLoading: isChannelLoading } = useChannels();

  const channel = channels.find((ch) => ch._id === channelId);
  const currentUser = users.find((user) => user.username === username);

  if (isMessagesLoading || isChannelLoading || isUserLoading) {
    return <p>Loading data...</p>;
  }

  if (channelError || userError) {
    return (
      <div>
        <Link to={"/channels"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="small-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
        <p>Error: {channelError || userError}</p>;
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="chat-room">
        <Link to={"/channels"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="small-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
        <p>Channel not found.</p>
      </div>
    );
  }

  const senderId = currentUser ? currentUser._id : null;

  const shouldShowInput =
    !channel.isLocked || (channel.isLocked && isLoggedIn && senderId);

  return (
    <div className="chat-room container">
      <ChatRoomNavBar channelName={channel.name} />
      <ChatRoomMessages messages={messages} messageError={messageError} />
      {shouldShowInput && (
        <SendMessage
          channelId={channelId}
          senderId={senderId}
          isLocked={channel.isLocked}
          refreshMessages={fetchMessages}
        />
      )}
    </div>
  );
}

export default ChatRoomPage;
