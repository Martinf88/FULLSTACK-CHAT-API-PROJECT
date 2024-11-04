import { Link } from "react-router-dom";
import SendMessage from "../components/chatroom/ChatRoomSendMessage";
import { useAuthStore } from "../store/authStore";
import useDirectMessages from "../hooks/useDirectMessages";
import ChatRoomNavBar from "../components/chatroom/ChatRoomNavBar";
import DmRoomMessages from "../components/chatroom/DmRoomMessages";

function DMChatPage() {
  const users = useAuthStore((state) => state.users);
  const receiverId = useAuthStore((state) => state.receiverId);
  const username = localStorage.getItem("username");

  const currentUser = users.find((user) => user.username === username);
  const currentReceiver = users.find((user) => user._id === receiverId);
  const senderId = currentUser ? currentUser._id : null;

  if (!senderId || !receiverId) {
    return (
      <div>
        <Link to={"/channels"}>go back</Link>
        <p>Please select a user to chat with.</p>;
      </div>
    );
  }

  const { error, directMessages, isLoading, refetch } = useDirectMessages(
    senderId,
    receiverId
  );

  if (isLoading) {
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
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
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
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dm-chat-room container">
      <ChatRoomNavBar
        channelName={
          currentReceiver ? currentReceiver.username : "Unknown User"
        }
      />
      <DmRoomMessages
        directMessages={directMessages}
        users={users}
        senderId={senderId}
      />
      <SendMessage
        senderId={senderId}
        receiverId={receiverId}
        refreshMessages={refetch}
      />
    </div>
  );
}

export default DMChatPage;
