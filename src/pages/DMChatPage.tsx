import { Link } from "react-router-dom";
import SendMessage from "../components/chatroom/ChatRoomSendMessage";
import { useAuthStore } from "../store/authStore";
import useDirectMessages from "../hooks/useDirectMessages";
import { DirectMessage } from "../models/DmModel";
import ChatRoomNavBar from "../components/chatroom/ChatRoomNavBar";
import { useAutoScroll } from "../hooks/useAutoScroll";

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

  const {
    containerRef,
    shouldAutoScroll,
    scrollToBottom,
    handleScroll,
    checkIfFull,
  } = useAutoScroll<DirectMessage[]>([directMessages]);

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
      <div className="dm-chat-room__messages-container">
        <div
          className="dm-chat-room__messages"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {directMessages.length > 0 ? (
            directMessages.map((directMessage: DirectMessage) => {
              const sender = users.find(
                (user) => user._id === directMessage.senderId
              );
              const isCurrentUserSender = directMessage.senderId === senderId;
              const displayName = isCurrentUserSender
                ? "You"
                : sender?.username || "Unknown User";

              return (
                <div
                  key={directMessage._id}
                  className={`dm-chat-room__message-wrapper`}
                >
                  <div className="dm-chat-room__message">
                    <span
                      className={`dm-chat-room__user dm-chat-room__user--${
                        isCurrentUserSender ? "sent" : "received"
                      }`}
                    >
                      {displayName}
                    </span>
                    <span className="dm-chat-room__content">
                      {directMessage.content}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="chat-room__empty-message-wrapper">
              <p className="chat-room__empty-message">
                No messages yet. Be the first to send one!
              </p>
            </div>
          )}
        </div>
        {!shouldAutoScroll && directMessages.length > 0 && checkIfFull() && (
          <button
            onClick={scrollToBottom}
            className="chat-room__scroll-button"
            aria-label="Scroll to latest messages"
          >
            ↓
          </button>
        )}
      </div>
      <SendMessage
        senderId={senderId}
        receiverId={receiverId}
        refreshMessages={refetch}
      />
    </div>
  );
}

export default DMChatPage;
