import { Channel } from './channel';
import { Message, API, APIPublishMessage } from './types';

const events: APIPublishMessage[] = [Message.PUBLISH_CONTENT];

export function publishApi(channel: Channel) {
  const handler = (eventType: Message) => {
    return async (filters: any) => {
      return channel.call(eventType, filters);
    };
  };

  return events.reduce((acc, event) => {
    acc[event] = handler(event as Message);
    return acc;
  }, {} as API<APIPublishMessage>);
}
