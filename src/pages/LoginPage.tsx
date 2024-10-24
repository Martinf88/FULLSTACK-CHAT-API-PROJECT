import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

// TODO: Fetcha users och dm's vid inloggning

function LoginPage() {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const username = useAuthStore(state => state.username);
	const setUsername = useAuthStore(state => state.setUsername);
	const { loginUser } = useLogin()
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const data = { username, password }
		try {
			await loginUser(data);
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
				   value={username}
				   onChange={(e) => setUsername(e.target.value)}
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