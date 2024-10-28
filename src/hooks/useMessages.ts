import { useEffect, useState, useCallback } from "react";
import { Message } from "../models/messageModel";

const useMessages = (channelId: string) => {
	const [messages, setMessages] = useState<Message[]>([])
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchMessages = useCallback(async () => {
		setIsLoading(true);
		const token = localStorage.getItem("jwtToken");

		try {
			const response = await fetch(`/api/messages/${channelId}`, {
				headers: {
					Authorization: token ? token : '',
				},
			});

			if (!response.ok) {
				if (response.status === 404) {
					setError("Channel not found.");
				} else if (response.status === 403) {
					setError("You do not have access to this channel.");
				} else {
					setError("Failed to fetch messages.");
				}
				return;
			}

			const messages = await response.json();
			setMessages(messages);
		} catch (err) {
			console.error('Error fetching messages:', err);
			setError("An error occurred while fetching messages.");
		} finally {
			setIsLoading(false)
		}
	}, [channelId])

	useEffect(() => {
		fetchMessages()
	}, [channelId])

	return {messages, error, isLoading, fetchMessages}
}


export default useMessages