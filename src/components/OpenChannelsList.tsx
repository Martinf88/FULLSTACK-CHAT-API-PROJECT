import { Link } from "react-router-dom";
import { Channel } from "../models/channelModel"


interface OpenChannelsListProps {
	openChannels: Channel[];
}

function OpenChannelsList({ openChannels }: OpenChannelsListProps ) {
	

	return (

		<div className="channels__list">
					{openChannels.map(channel => (
                    <Link className="channel-link" to={`/chatroom/${channel._id}`} key={channel._id}>
                        <span>{channel.name}</span>
                        <span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xs-icon">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
								</svg>
						</span>
                    </Link>
                ))}	
				</div>
	)
}

export default OpenChannelsList