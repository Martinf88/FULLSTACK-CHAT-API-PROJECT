import '../styles/modern-normalize.css'
import '../styles/Root.css'
import '../styles/components/login-page.css'
import '../styles/error-page.css'
import '../styles/components/nav-bar.css'
import '../styles/components/channels-page.css'
import '../styles/components/log-in-modal.css'
import '../styles/components/chat-room-page.css'
import '../styles/utils.css'
import NavBar from '../components/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

function Root() {
	const location = useLocation()

	const isLoginPage = location.pathname === '/login';


	return (
		<div className='app-container'>
		{!isLoginPage && <NavBar />}
		<Outlet/>
		</div>
	)
}

export default Root