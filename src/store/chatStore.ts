import { create } from 'zustand';

interface ChatStore {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	isLoggedIn: false,
	setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value })
}))


