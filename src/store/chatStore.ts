import { create } from 'zustand';
import { Channel } from '../models/channelModel';
import { User } from '../models/userModel';

interface ChatStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	username: string;
	setUsername: (value: string) => void;
	channels: Channel[];
	setChannels: (value: Channel[]) => void;
	users: User[];
	setUsers: (value: User[]) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
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

	channels: [],
	setChannels: (channels: Channel[]) => set({ channels }),
	
	users: [],
	setUsers: (users: User[]) => set({ users }),
}))


