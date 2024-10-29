import { useEffect, useState, useCallback } from "react";
import { DirectMessage } from "../models/DmModel";

const useDirectMessages = (senderId: string, receiverId: string) => {
	const [messages, setMessages] = useState<DirectMessage[]>([])
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchDirectMessages = useCallback(async () => {
		setIsLoading(true);
		const token = localStorage.getItem("jwtToken");

		try {
			const response = await fetch(`/api/directMessages/${senderId}/${receiverId}`, {
				headers: {
					Authorization: token ? token : '',
				},
			});

			if (!response.ok) {
				if (response.status === 404) {
					setError("Direct messages not found.");
				} else if (response.status === 403) {
					setError("You do not have access to these messages.");
				} else {
					setError("Failed to fetch direct messages.");
				}
				return;
			}

			const data = await response.json();
			setMessages(data);
		} catch (err) {
			console.error('Error fetching direct messages:', err);
			setError("An error occurred while fetching direct messages.");
		} finally {
			setIsLoading(false)
		}
	}, [senderId, receiverId])

	useEffect(() => {
		if (senderId && receiverId) {
			fetchDirectMessages();
		}
	}, [senderId, receiverId, fetchDirectMessages])

	return {messages, error, isLoading, fetchDirectMessages}
}


export default useDirectMessages