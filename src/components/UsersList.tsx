import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import LogInModal from "./LogInModal"

function UsersList(  ) {
	const users = useAuthStore(state => state.users)
	const username = useAuthStore(state => state.username)
	const setReceiverId = useAuthStore(state => state.setReceiverId)
	const setIsModalOpen = useAuthStore(state => state.setIsModalOpen)
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const otherUsers = users.filter(user => user.username !== username)
	const navigate = useNavigate()

	const handleUserClick = (e: React.MouseEvent ,userId: string) => {
		e.preventDefault()
		setReceiverId(userId)
		if(!isLoggedIn) {
			setIsModalOpen(true)
		} else {
			navigate('/dm')
		}
	}

	const closeModal = () => {
		setIsModalOpen(false);
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
						onClick={(e) => handleUserClick(e, user._id)}
					>
						<span> {user.username} </span>
					</Link>
				))}
				<LogInModal
				onClose={closeModal}
				message="Please log in to add a DM"
			/>
		</div>
	)
}

export default UsersList