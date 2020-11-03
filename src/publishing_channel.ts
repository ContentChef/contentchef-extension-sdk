import { API, MessageType } from './types';
import { Channel } from './channel';

const events: string[] = [
    MessageType.CREATE_PUBLISHING_CHANNEL,
    MessageType.GET_PUBLISHING_CHANNEL,
    MessageType.UPDATE_PUBLISHING_CHANNEL,
    MessageType.LIST_PUBLISHING_CHANNEL
];

export function publishingChannelApi(channel: Channel) {
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