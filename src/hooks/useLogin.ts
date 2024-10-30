import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useUsers from "../hooks/useUsers";

const useLogin = () => {
	const { setIsLoggedIn, setUsername } = useAuthStore(state => ({
        setIsLoggedIn: state.setIsLoggedIn,
        setUsername: state.setUsername
    }));
	const navigate = useNavigate();

	const users = useUsers();

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
				throw new Error("Wrong username or password");
				
			}
		
			const responseData = await response.json();
	
			if(responseData.token) {
				localStorage.setItem('jwtToken', responseData.token)
				localStorage.setItem('username', data.username);

				setIsLoggedIn(true)
				setUsername(data.username)
				
				navigate('/')
			} else {
				  throw new Error('Login failed. Token not found in response.');
			}
			
		} catch (error) {
            let errorMessage = 'An error occurred. Please try again later.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
	}
	return { loginUser, users };
}



export default useLogin;