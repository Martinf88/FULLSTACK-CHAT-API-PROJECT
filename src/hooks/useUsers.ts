import { useEffect, useState } from "react"
import { User } from "../models/userModel"
import { useChatStore } from "../store/chatStore"


const useUsers = () => {
	const setUsers = useChatStore(state => state.setUsers)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)


	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
            setError(null);

			try {
				const response = await fetch('/api/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users')
				}
				const users: User[] = await response.json();
				setUsers(users);
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

		fetchUsers();
	}, [])

	return { error, isLoading }
}


export default useUsers