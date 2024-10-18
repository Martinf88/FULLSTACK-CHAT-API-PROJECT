import { useState } from "react";


function LoginPage() {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoggedIn, SetIsLoggedIn] = useState<Boolean>(false);


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		console.log('Username:', username);
		console.log('Password:', password);
		
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