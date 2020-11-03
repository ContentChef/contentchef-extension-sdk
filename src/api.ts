import { Channel } from './channel';
import { contentApi } from './content';
import { definitionApi } from './definition';
import { publishApi } from './publish';
import { publishingChannelApi } from './publishing_channel';
import { repositoryApi } from './repository';

export function createRestApi(channel: Channel) {
    const content = contentApi(channel);
    const publishingChannel = publishingChannelApi(channel);
    const repository = repositoryApi(channel);
    const definition = definitionApi(channel);
    const publish = publishApi(channel);

    return {
        content,
        publishingChannel,
        repository,
        definition,
        publish
    }
}