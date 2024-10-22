import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const username = useChatStore(state => state.username);
	const setUsername = useChatStore(state => state.setUsername);
	const setIsLoggedIn = useChatStore(state => state.setIsLoggedIn);
	const isLoggedIn = useChatStore(state => state.isLoggedIn);
	const navigate = useNavigate();

	const loginUser = async (data: { username: string, password: string }) => {
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify( data )
			})
	
			if(response.status !== 200) {
				setError('Wrong username or password!')
				console.log('Error message från servern: ', response.status);
				return
			}
		
			const responseData = await response.json();
			console.log('Message from server: ', responseData);

			if(responseData.token) {
				console.log('JWT-token: ', responseData.token);
				localStorage.setItem('jwtToken', responseData.token)
				if(!isLoggedIn){
					setIsLoggedIn(true)
				}
				navigate('/')
			} else {
				setError('Login failed. Token not found in response')
				console.log('Token not found in response.');
			}
			
		} catch(error) {
			console.error('An error occurred during login:', error);
			setError('An error occurred. Please try again later.')
		}
	}


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const data = { username, password }
		await loginUser(data);
	}
	
	return (
		<div className="login-page">
			<form onSubmit={handleSubmit} className="form container">
				<h2 className="form-group">Welcome</h2>
				<div className="form-group">
				 <label htmlFor="username">Username:</label>
				 <input
				   type="text"
				   id="username"
				   value={username}
				   onChange={(e) => setUsername(e.target.value)}
				   required
				 />
			   </div>
			   <div className="form-group">
				 <label htmlFor="password">Password:</label>
				 <input
				   type="password"
				   id="password"
				   value={password}
				   onChange={(e) => setPassword(e.target.value)}
				   required
				 />
			   </div>
			   <button type="submit" className="btn form-group">
				 Log in
			   </button>
			   {error && <p className="error-message"> {error} </p>}
			   <Link  to={'/'}>Continue as guest</Link>
			</form>
		</div>
	)
}

export default LoginPage