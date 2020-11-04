import { API, Message, APIContentMessage } from './types';
import { Channel } from './channel';

const events: APIContentMessage[] = [
    Message.CREATE_CONTENT,
    Message.GET_CONTENT,
    Message.UPDATE_CONTENT,
    Message.LIST_CONTENT
];

export function contentApi(channel: Channel) {
    const handler = (eventType: Message) => {
        return async (filters: any) => {
            return channel.call(eventType, filters);
        }
    }

    return events.reduce((acc, event) => {
        acc[event] = handler(event as Message);
        return acc;
    }, 
    {} as API<APIContentMessage>);
}