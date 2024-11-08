import OpenChannelsList from "./OpenChannelsList";
import LockedChannelsList from "./LockedChannelsList";
import { useChatStore } from "../../store/chatStore";

function ChannelsSection() {
  const channels = useChatStore((state) => state.channels);

  const openChannels = channels.filter((channel) => !channel.isLocked);
  const lockedChannels = channels.filter((channel) => channel.isLocked);

  return (
    <div className="channels-section">
      <div className="channels-title__wrapper">
        <h2 className="title">Open Channels</h2>
      </div>
      <OpenChannelsList openChannels={openChannels} />
      <div className="channels-title__wrapper">
        <h2 className="title">Locked Channels</h2>
      </div>
      <LockedChannelsList lockedChannels={lockedChannels} />
    </div>
  );
}

export default ChannelsSection;
