import { useEffect, useRef, useState } from "react";
import { Message } from "../../models/messageModel";
import { useAuthStore } from "../../store/authStore";

interface ChatRoomMessagesProps {
  messages: Message[];
  messageError: string | null;
}

const ChatRoomMessages: React.FC<ChatRoomMessagesProps> = ({
  messages,
  messageError,
}) => {
  const users = useAuthStore((state) => state.users);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (!containerRef.current || !shouldAutoScroll) return;

    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages, shouldAutoScroll]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isScrollNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    setShouldAutoScroll(isScrollNearBottom);
  };

  // Check if messages fill the container
  const checkIfFull = () => {
    if (!containerRef.current) return false;
    return (
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    );
  };

  return (
    <div className="chat-room__messages-container">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="chat-room__messages"
      >
        {messages.length > 0 && <div className="chat-room__spacer" />}

        {messages.length > 0 ? (
          messages.map((message) => {
            const user = users.find((user) => user._id === message.senderId);

            return (
              <div key={message._id} className="chat-room__message-wrapper">
                <p className="chat-room__message">
                  <span className="chat-room__user">
                    {user ? user.username : message.senderId}
                  </span>
                  <span className="chat-room__content">{message.content}</span>
                </p>
              </div>
            );
          })
        ) : (
          <div className="chat-room__empty-message-wrapper">
            <p className="chat-room__empty-message">
              {isLoggedIn
                ? "No messages yet. Be the first to send one!"
                : messageError || "You need to log in to see messages."}
            </p>
          </div>
        )}
      </div>

      {!shouldAutoScroll && messages.length > 0 && checkIfFull() && (
        <button
          onClick={() => {
            containerRef.current?.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
            setShouldAutoScroll(true);
          }}
          className="chat-room__scroll-button"
          aria-label="Scroll to latest messages"
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default ChatRoomMessages;
