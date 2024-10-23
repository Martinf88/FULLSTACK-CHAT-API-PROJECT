import { useEffect, useState } from "react"
import { Channel } from "../models/channelModel"


const useChannels = () => {
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

	return { channels, error, isLoading }
}


export default useChannels