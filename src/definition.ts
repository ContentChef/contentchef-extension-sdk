import { API, APIDefinitionMessage, Message } from './types';
import { Channel } from './channel';

const events: APIDefinitionMessage[] = [
  Message.CREATE_DEFINITION,
  Message.GET_DEFINITION,
  Message.UPDATE_DEFINITION,
  Message.LIST_DEFINITION,
];

export function definitionApi(channel: Channel) {
  const handler = (eventType: Message) => {
    return async (filters: any) => {
      return channel.call(eventType, filters);
    };
  };

  return events.reduce((acc, event) => {
    acc[event] = handler(event as Message);
    return acc;
  }, {} as API<APIDefinitionMessage>);
}
