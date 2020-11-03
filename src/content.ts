import { API, MessageType } from './types';
import { Channel } from './channel';

const events: string[] = [
    MessageType.CREATE_CONTENT,
    MessageType.GET_CONTENT,
    MessageType.UPDATE_CONTENT,
    MessageType.LIST_CONTENT
];

export function contentApi(channel: Channel) {
    const handler = (eventType: MessageType) => {
        return async (filters: any) => {
            return channel.call(eventType, filters);
        }
    }

    return events.reduce((acc, event) => {
        acc[event] = handler(event as MessageType);
        return acc;
    }, 
    {} as API);
}