import { Channel } from "../../models/channelModel";
import OpenChannelsList from "./OpenChannelsList";
import LockedChannelsList from "./LockedChannelsList";

interface ChannelsSectionProps {
	channels: Channel[]
}


function ChannelsSection( {channels}: ChannelsSectionProps ) {


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