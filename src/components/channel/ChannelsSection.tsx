import OpenChannelsList from "./OpenChannelsList";
import LockedChannelsList from "./LockedChannelsList";
import { useChatStore } from "../../store/chatStore";

function ChannelsSection( ) {
	const channels = useChatStore(state => state.channels)


	const openChannels = channels.filter(channel => !channel.isLocked);
	const lockedChannels = channels.filter(channel => channel.isLocked);

	return(
		<div className="channels-section">
				<h2 className="channels__title">Open Channels</h2>
				<OpenChannelsList openChannels={openChannels} />
				<h2 className="channels__title locked__title">Locked Channels</h2>
				<LockedChannelsList lockedChannels={lockedChannels} />
			</div>
	)
}


export default ChannelsSection