import { API, APIPublishingChannelMessage, Message } from './types';
import { Channel } from './channel';

const events: APIPublishingChannelMessage[] = [
  Message.CREATE_PUBLISHING_CHANNEL,
  Message.GET_PUBLISHING_CHANNEL,
  Message.UPDATE_PUBLISHING_CHANNEL,
  Message.LIST_PUBLISHING_CHANNEL,
];

export function publishingChannelApi(channel: Channel) {
  const handler = (eventType: Message) => {
    return async (filters: any) => {
      return channel.call(eventType, filters);
    };
  };

  return events.reduce((acc, event) => {
    acc[event] = handler(event as Message);
    return acc;
  }, {} as API<APIPublishingChannelMessage>);
}
