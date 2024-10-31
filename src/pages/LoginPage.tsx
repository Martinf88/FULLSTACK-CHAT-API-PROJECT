import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function LoginPage() {
	const [inputUsername, setInputUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { loginUser } = useLogin()
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true)
	
		try {
			await loginUser({ username: inputUsername, password });
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
		} finally {
			setIsLoading(false)
		}
	}
	
	return (
		<div className="login-page container">
			<div className="title-wrapper">
				<h1 className="form-group title">ELDEN 	CHAPPY</h1>
				<h2 className="tagline form-group">Connect with friends and enemeis!</h2>
			</div>
			<form onSubmit={handleSubmit} className="form">
				<h2 className="form-group form__subtitle">Enter<br />The Lands Between!</h2>
				<div className="form-group form-username">
				 <label htmlFor="username">Username</label>
				 <input
				   type="text"
				   id="username"
				   value={inputUsername}
				   onChange={(e) => setInputUsername(e.target.value)}
				   required
				 />
			   </div>
			   <div className="form-group form-password">
				 <label htmlFor="password">Password</label>
				 <input
				   type="password"
				   id="password"
				   value={password}
				   onChange={(e) => setPassword(e.target.value)}
				   required
				 />
			   </div>
			   <button 
				type="submit" 
				className="btn form-group login-btn"
				disabled={isLoading}
				>
				 {isLoading ? <span>Loading...</span> : <span>Log in</span>}
			   </button>
			   {error && <p className="error-message"> {error} </p>}
			   <Link className="guest-link"  to={'/channels'}>Continue as guest</Link>
			</form>
		</div>
	)
}

export default LoginPage