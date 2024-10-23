import { useChatStore } from "../store/chatStore"
import { useEffect, useState } from "react"
import LogInModal from "../components/LogInModal"
import { Channel } from "../models/channelModel"
import DMSection from "../components/DMSection"
import ChannelsSection from "../components/ChannelsSection"

function ChannelsPage() {
	const isLoggedIn = useChatStore(state => state.isLoggedIn)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [channels, setChannels] = useState<Channel[]>([])
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchChannels = async () => {
			setIsLoading(true);
            setError(null);

			try {
				const response = await fetch('/api/channels');
				if (!response.ok) {
					throw new Error('Failed to fetch channels')
				}
				const channels: Channel[] = await response.json();
				setChannels(channels);
			} catch(e) {
				if (e instanceof Error) {
					setError(e.message)
				} else {
					setError('An unknown error occurred, please try again.')
				}
			} finally {
				setIsLoading(false);
			}
		}

		fetchChannels();
	}, [])

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