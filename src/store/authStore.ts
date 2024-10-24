import { create } from 'zustand';
import { User } from '../models/userModel';

interface AuthStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	username: string;
	setUsername: (value: string) => void;
	users: User[];
	setUsers: (value: User[]) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
	setIsLoggedIn: (isLoggedIn: boolean) => {
		localStorage.setItem('isLoggedIn', String(isLoggedIn));
		set({ isLoggedIn });
	},

	username: localStorage.getItem('username') || '',
	setUsername: (username: string) => {
		console.log('Setting username in localStorage:', username);
		localStorage.setItem('username', username);
		set({ username });
	},

	users: [],
	setUsers: (users: User[]) => set({ users }),
}));