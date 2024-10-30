import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useUsers from "./useUsers";

const useLogin = () => {
	const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)
	const setUsername = useAuthStore(state => state.setUsername)

	const navigate = useNavigate();
	
	const { fetchUsers } = useUsers();


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

				await fetchUsers();
				
				navigate('/channels')
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
	return { loginUser };
}



export default useLogin;