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
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	logoutAuthStore: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
	setIsLoggedIn: (isLoggedIn: boolean) => {
		localStorage.setItem('isLoggedIn', String(isLoggedIn));
		set({ isLoggedIn });
	},

	username: localStorage.getItem('username') || '',
	setUsername: (username: string) => {
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

	isModalOpen: false,
  	setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),

	logoutAuthStore: () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('username');
		localStorage.removeItem('receiverId');
		localStorage.removeItem('jwtToken')
		
		set({
		  isLoggedIn: false,
		  username: '',
		  receiverId: null,
		  isModalOpen: false,
		});
	  },

}));