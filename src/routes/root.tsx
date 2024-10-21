import '../styles/modern-normalize.css'
import '../styles/Root.css'
import '../styles/utils.css'
import '../styles/components/login-page.css'
import '../styles/error-page.css'
import '../styles/components/nav-bar.css'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

function Root() {
	return (
		<>
		<NavBar/>
		<Outlet/>
		</>
	)
}

export default Root