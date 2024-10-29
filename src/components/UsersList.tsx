import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { User } from "../models/userModel"

function UsersList(  ) {
	const users: User[] = useAuthStore(state => state.users)
	const username: string = useAuthStore(state => state.username)
	const otherUsers = users.filter(user => user.username !== username)


	return(
		<div className="channels-section">
				<h1 className="channels__title">Users</h1>
				{otherUsers.map(user => (
					<Link className="channel-link" to={'/dm'} key={user._id}>
						<span> {user.username} </span>
					</Link>
				))}
				
		</div>
	)
}


export default UsersList