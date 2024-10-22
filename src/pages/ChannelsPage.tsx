import { useChatStore } from "../store/chatStore"
import { useEffect, useState } from "react"
import LogInModal from "../components/LogInModal"
import { Channel } from "../models/channelModel"

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
				<ul>
					{channels.map(channel => (
                    <li key={channel._id}>
                        <span>{channel.name}</span>
                        <span>
							{channel.isLocked ? 
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xs-icon lock">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
								</svg>
							: 
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="xs-icon lock">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
								</svg>
							}

						</span>
                    </li>
                ))}	
				</ul>
			</div>
			<LogInModal
				isOpen={isModalOpen}
				onClose={closeModal}
				message="Please log in to add a DM"
			/>
		</section>
	)
}

export default ChannelsPage