import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { User } from "../models/userModel"

function UsersList(  ) {
	const users: User[] = useAuthStore(state => state.users)
	const username: string = useAuthStore(state => state.username)
	const otherUsers = users.filter(user => user.username !== username)
	const setReceiverId = useAuthStore((state) => state.setReceiverId)

	const handleUserClick = (userId: string) => {
		setReceiverId(userId)
	}


	return(
		<div className="channels-section">
			<div className="wrapper">
				<h1 className="channels__title">Users</h1>
				<input className="input" type="text" placeholder="Find user..." />
			</div>
				{otherUsers.map(user => (
					<Link 
						className="channel-link" 
						to={'/dm'} 
						key={user._id}
						onClick={() => handleUserClick(user._id)}
					>
						<span> {user.username} </span>
					</Link>
				))}
				
		</div>
	)
}


export default UsersList