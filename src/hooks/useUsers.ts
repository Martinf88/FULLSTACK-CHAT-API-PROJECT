import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { User } from "../models/userModel";

const useUsers = () => {
	const setUsers = useAuthStore(state => state.setUsers);

 	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const usersData: User[] = await response.json();
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching users.');
    } finally {
      setIsLoading(false);
    }
  };


  return { fetchUsers, isLoading, error };
};

export default useUsers;
