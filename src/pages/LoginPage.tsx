import { useState } from "react";


function LoginPage() {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	// const [isLoggedIn, SetIsLoggedIn] = useState<Boolean>(false);


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		console.log('Username:', username);
		console.log('Password:', password);

		const data = { username, password }

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify( data )
			})
	
			if(response.status !== 200) {
				console.log('Error message från servern: ', response.status);
			}
		
			const responseData = await response.json();
			console.log('Message from server: ', responseData);

			if(responseData.token) {
				console.log('JWT-token: ', responseData.token);
				localStorage.setItem('jwtToken', responseData.token)
			} else {
				console.log('Token not foind in response.');
				
			}
			
		} catch(error) {
			console.error('An error occurred during login:', error);
		}

		
		
	}
	
	return (
		<div className="login-page">
				<h1 className="login-page__title">CHAPPY</h1>
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
			   <a  href="">Continue as guest</a>
			</form>
		</div>
	)
}

export default LoginPage