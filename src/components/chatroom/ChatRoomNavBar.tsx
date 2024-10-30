import { Link } from "react-router-dom"


interface ChannelRoomNavBarProps {
	channelName: string;
}


const ChatRoomNavBar: React.FC<ChannelRoomNavBarProps> = ( {channelName} ) => {
	return (
		<div className="chat-room__nav-wrapper">
		  <Link to={'/channels'} className="chat-room__link">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="small-icon">
			  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
		  </Link>
		  <h1 className="chat-room__title">{channelName}</h1>

			</div>
	)
}

export default ChatRoomNavBar