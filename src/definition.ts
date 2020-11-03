import { API, MessageType } from './types';
import { Channel } from './channel';

const events: string[] = [
    MessageType.CREATE_DEFINITION,
    MessageType.GET_DEFINITION,
    MessageType.UPDATE_DEFINITION,
    MessageType.LIST_DEFINITION
];

export function definitionApi(channel: Channel) {
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