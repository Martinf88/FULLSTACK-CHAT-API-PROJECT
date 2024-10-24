import { create } from 'zustand';
import { Channel } from '../models/channelModel';

interface ChatStore {
	channels: Channel[];
	setChannels: (value: Channel[]) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	channels: [],
	setChannels: (channels: Channel[]) => set({ channels }),
	
}))


