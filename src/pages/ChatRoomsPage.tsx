import { useChatStore } from "../store/chatStore"
import { useState } from "react"
import LogInModal from "../components/LogInModal"

function ChatRoomsPage() {
	const isLoggedIn = useChatStore(state => state.isLoggedIn)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleAddDm = () => {
		if(!isLoggedIn) {
			setIsModalOpen(true)
		}
	}

	const closeModal = () => {
		setIsModalOpen(false);
	}
	
	return (
		<section className="chat-rooms-section">
			<div className="chat-rooms-section__dm">
				<h2 className="dm-title">DM</h2>
				<button onClick={handleAddDm}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="large-icon">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>

				</button>
			</div>
			<div className="chat-rooms-section__channels">
				<h2 className="channels__title">Channels</h2>
			</div>
			<LogInModal
				isOpen={isModalOpen}
				onClose={closeModal}
				message="Please log in to add a DM"
			/>
		</section>
	)
}

export default ChatRoomsPage