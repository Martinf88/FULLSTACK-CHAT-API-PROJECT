import { useAutoScroll } from "../../hooks/useAutoScroll";
import { DirectMessage } from "../../models/DmModel";
import { User } from "../../models/userModel";

interface DmRoomMessagesProps {
  directMessages: DirectMessage[];
  users: User[];
  senderId: string;
}

const DmRoomMessages: React.FC<DmRoomMessagesProps> = ({
  directMessages,
  users,
  senderId,
}) => {
  const {
    containerRef,
    shouldAutoScroll,
    scrollToBottom,
    handleScroll,
    checkIfFull,
  } = useAutoScroll<DirectMessage[]>([directMessages]);

  return (
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
  );
};

export default DmRoomMessages;
