import { useChatStore } from "../store/chatStore"
import { useState } from "react"
import LogInModal from "../components/LogInModal"
import DMSection from "../components/DMSection"
import ChannelsSection from "../components/ChannelsSection"
import useChannels from "../hooks/useChannels"

function ChannelsPage() {
	const isLoggedIn = useChatStore(state => state.isLoggedIn)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { channels, error, isLoading } = useChannels()

	const handleAddDm = () => {
		if(!isLoggedIn) {
			setIsModalOpen(true)
		}
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
			<DMSection onAddDM={handleAddDm}/>
			<ChannelsSection channels={channels} />
			<LogInModal
				isOpen={isModalOpen}
				onClose={closeModal}
				message="Please log in to add a DM"
			/>
		</section>
	)
}

export default ChannelsPage