import { useChatStore } from "../store/chatStore";
import SideMenu from "../components/SideMenu";
import ChannelsSection from "../components/channel/ChannelsSection";
import useChannels from "../hooks/useChannels";
import UsersList from "../components/UsersList";

function ChannelsPage() {
  const setShowUsers = useChatStore((state) => state.setShowUsers);
  const showUsers = useChatStore((state) => state.showUsers);

  const { error, isLoading } = useChannels();

  const handleShowUsers = () => {
    setShowUsers(true);
  };
  const handleShowChatRooms = () => {
    setShowUsers(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching channels: {error}</div>;
  }
  return (
    <section className="chat-rooms-section container">
      <SideMenu
        handleShowUsers={handleShowUsers}
        handleShowChatRooms={handleShowChatRooms}
      />
      {!showUsers ? <ChannelsSection /> : <UsersList />}
    </section>
  );
}

export default ChannelsPage;
