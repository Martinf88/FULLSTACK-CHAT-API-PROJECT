import { Link, useNavigate } from "react-router-dom"
import { useChatStore } from "../store/chatStore"

function NavBar () {
	const isLoggedIn = useChatStore(state => state.isLoggedIn)
	const setIsLoggedIn = useChatStore(state => state.setIsLoggedIn)
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem('jwtToken')
		setIsLoggedIn(false)

		navigate('/login')
	}


	return (
		<nav className="nav">
			<div className="nav-text__wrapper">
				<h1 className="nav__title">CHAPPY</h1>
				<p className="nav__subtitle">Guest or username</p>
			</div>
			{!isLoggedIn ? (
				<Link to={'login'}>Log in</Link>

			) : (
				<Link to={'login'} onClick={handleLogOut}>Log out</Link>
			)
		}
		</nav>
	)
}

export default NavBar