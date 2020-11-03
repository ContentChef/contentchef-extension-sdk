import { API, MessageType } from './types';
import { Channel } from './channel';

const events: string[] = [
    MessageType.GET_REPOSITORY,
    MessageType.LIST_REPOSITORY,
    MessageType.CREATE_REPOSITORY,
    MessageType.UPDATE_REPOSITORY
];

export function repositoryApi(channel: Channel) {
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