import { create } from 'zustand';
import { Channel } from '../models/channelModel';
import { Message } from '../models/messageModel';
import { DirectMessage } from '../models/DmModel';

interface ChatStore {
	channels: Channel[];
	setChannels: (value: Channel[]) => void;
	messages: Message[];
	setMessages: (value: Message[]) => void;
	directMessages: DirectMessage[];
	setDirectmessages: (value: DirectMessage[]) => void;
	showUsers: boolean
	setShowUsers: (value: boolean) => void;
	logoutChatStore: () => void;
}

export const useChatStore = create<ChatStore>( (set) => ({
	channels: JSON.parse(localStorage.getItem('channels') || '[]') as Channel[],
	setChannels: (channels: Channel[]) => {
		set({ channels });
		localStorage.setItem('channels', JSON.stringify(channels))
	},

	messages: JSON.parse(localStorage.getItem('messages') || '[]') as Message[],
	setMessages: (messages: Message[]) => {
		set({ messages });
		localStorage.setItem('messages', JSON.stringify(messages))
	},
	
	directMessages: JSON.parse(localStorage.getItem('directMessages') || '[]') as DirectMessage[],
	setDirectmessages: (directMessages: DirectMessage[]) => {
		set({ directMessages });
		localStorage.setItem('directMessages', JSON.stringify(directMessages))
	},

	showUsers: false,
	setShowUsers: (value: boolean) => set({ showUsers: value}),
	
	logoutChatStore: () => {
		localStorage.removeItem('channels')
		localStorage.removeItem('directMessages')
		localStorage.removeItem('users')
		
		set({
			showUsers: false,
		});
	  },
}))


