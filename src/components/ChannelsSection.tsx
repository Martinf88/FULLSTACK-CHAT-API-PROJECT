import { Channel } from "../models/channelModel";

interface ChannelsSectionProps {
	channels: Channel[]
}


function ChannelsSection( {channels}: ChannelsSectionProps ) {


	const openChannels = channels.filter(channel => !channel.isLocked);
	const lockedChannels = channels.filter(channel => channel.isLocked);

	return(
		<div className="channels-section">
				<h2 className="channels__title">Open Channels</h2>
				<ul className="channels__list">
					{openChannels.map(channel => (
                    <li key={channel._id}>
                        <span>{channel.name}</span>
                        <span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xs-icon">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
								</svg>
						</span>
                    </li>
                ))}	
				</ul>
				<h2 className="channels__title locked__title">Locked Channels</h2>
				<ul className="channels__list">
					{lockedChannels.map(channel => (
                    <li key={channel._id}>
                        <span>{channel.name}</span>
                        <span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xs-icon">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
							</svg>
						</span>
                    </li>
                ))}	
				</ul>
			</div>
	)
}


export default ChannelsSection