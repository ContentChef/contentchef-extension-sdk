import { API, APIRepositoryMessage, Message } from './types';
import { Channel } from './channel';

const events: APIRepositoryMessage[] = [
  Message.GET_REPOSITORY,
  Message.LIST_REPOSITORY,
  Message.CREATE_REPOSITORY,
  Message.UPDATE_REPOSITORY,
];

export function repositoryApi(channel: Channel) {
  const handler = (eventType: Message) => {
    return async (filters: any) => {
      return channel.call(eventType, filters);
    };
  };

  return events.reduce((acc, event) => {
    acc[event] = handler(event as Message);
    return acc;
  }, {} as API<APIRepositoryMessage>);
}
