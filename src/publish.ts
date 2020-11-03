import { Channel } from './channel';
import { MessageType, API } from './types';

const events: string[] = [
    MessageType.PUBLISH_CONTENT,
];

export function publishApi(channel: Channel) {
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