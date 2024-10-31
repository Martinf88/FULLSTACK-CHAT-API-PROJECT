import { useChatStore } from "../store/chatStore"
import { useState } from "react"
import LogInModal from "../components/LogInModal"
import SideMenu from "../components/SideMenu"
import ChannelsSection from "../components/channel/ChannelsSection"
import useChannels from "../hooks/useChannels"
import { useAuthStore } from "../store/authStore"
import UsersList from "../components/UsersList"

function ChannelsPage() {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const setShowUsers = useChatStore(state => state.setShowUsers)
	const showUsers = useChatStore(state => state.showUsers)
	const channels = useChatStore(state => state.channels)
	
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { error, isLoading } = useChannels()

	const handleShowUsers = () => {
		if(!isLoggedIn) {
			setIsModalOpen(true)
		} else if (isLoggedIn) {
			setShowUsers(true)
		}
	}
	const handleShowChatRooms = () => {
		setShowUsers(false)
	}

	const closeModal = () => {
		setIsModalOpen(false);
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error fetching channels: {error}</div>
	}

	return (
		<section className="chat-rooms-section">
			<SideMenu handleShowUsers={handleShowUsers} handleShowChatRooms={handleShowChatRooms} />
			{!showUsers ? ( <ChannelsSection channels={channels}/> ) : ( <UsersList/> )}
			
			
			<LogInModal
				isOpen={isModalOpen}
				onClose={closeModal}
				message="Please log in to add a DM"
			/>
		</section>
	)
}

export default ChannelsPage