import { create } from 'zustand';
import { Channel } from '../models/channelModel';
import { Message } from '../models/messageModel';

interface ChatStore {
	channels: Channel[];
	setChannels: (value: Channel[]) => void;
	messages: Message[];
	setMessages: (value: Message[]) => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	channels: [],
	setChannels: (channels: Channel[]) => set({ channels }),

	messages: [],
	setMessages: (messages: Message[]) => set({ messages }),
	
}))


