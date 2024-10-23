export interface Message {
	_id: string;
	content: string;
	channelId: string;
	timestamp: boolean;
	senderId?: string;
}