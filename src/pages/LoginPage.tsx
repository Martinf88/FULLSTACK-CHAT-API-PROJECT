import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

// TODO: Fetcha users och dm's vid inloggning
// TODO: Fix localstorage of username, it is bugged.

function LoginPage() {
	const [inputUsername, setInputUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const username = useAuthStore(state => state.username);
	const setUsername = useAuthStore(state => state.setUsername);
	const { loginUser } = useLogin()
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const data = { username: inputUsername, password }
		try {
			await loginUser(data);

			setUsername(inputUsername)
			localStorage.setItem('username', inputUsername)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
		}
	}
	
	return (
		<div className="login-page">
			<form onSubmit={handleSubmit} className="form">
				<h2 className="form-group">Welcome</h2>
				<div className="form-group">
				 <label htmlFor="username">Username</label>
				 <input
				   type="text"
				   id="username"
				   value={inputUsername}
				   onChange={(e) => setInputUsername(e.target.value)}
				   required
				 />
			   </div>
			   <div className="form-group">
				 <label htmlFor="password">Password</label>
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