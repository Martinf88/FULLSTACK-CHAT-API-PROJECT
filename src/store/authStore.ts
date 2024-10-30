import { create } from 'zustand';
import { User } from '../models/userModel';

interface AuthStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	username: string;
	setUsername: (value: string) => void;
	users: User[];
	setUsers: (value: User[]) => void;
	receiverId: string | null;
	setReceiverId: (id: string) => void;
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

	users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
	setUsers: (users: User[]) => {
		set({ users });
		localStorage.setItem('users', JSON.stringify(users));
	},

	receiverId: localStorage.getItem('receiverId') || null,
	setReceiverId: (id: string) => {
		set({ receiverId: id });
		localStorage.setItem('receiverId', id);
	},

}));