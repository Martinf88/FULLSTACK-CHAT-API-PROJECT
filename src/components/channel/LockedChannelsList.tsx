import { Link, useNavigate } from "react-router-dom";
import { Channel } from "../../models/channelModel";
import { useAuthStore } from "../../store/authStore";
import LogInModal from "../LogInModal";

interface LockedChannelsListProps {
  lockedChannels: Channel[];
}

function LockedChannelsList({ lockedChannels }: LockedChannelsListProps) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);

  const handleClick = (e: React.MouseEvent, channelId: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate(`/chatroom/${channelId}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="channels__list">
      {lockedChannels.map((channel) => (
        <Link
          className="channel-link"
          to={`/chatroom/${channel._id}`}
          key={channel._id}
          onClick={(e) => handleClick(e, channel._id)}
        >
          <span>{channel.name}</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="xs-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </span>
        </Link>
      ))}
      <LogInModal onClose={closeModal} message="Please log in to add a DM" />
    </div>
  );
}

export default LockedChannelsList;
