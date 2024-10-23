import { create } from 'zustand';
import { Channel } from '../models/channelModel';

interface ChatStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	username: string;
	setUsername: (value: string) => void;
	channels: Channel[];
	setChannels: (value: Channel[]) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	isLoggedIn: false,
	setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
	username: '',
	setUsername: (username: string) => set({ username }),
	channels: [],
	setChannels: (channels: Channel[]) => set({ channels }),
}))


