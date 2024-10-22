import { create } from 'zustand';

interface ChatStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	username: string;
	setUsername: (value: string) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	isLoggedIn: false,
	setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
	username: '',
	setUsername: (value: string) => set({ username: value})
}))


