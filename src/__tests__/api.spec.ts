import { createRestApi } from '../api';
import { Message } from '../types';
import { connectForTest, createIframe } from './frameUtils';

describe('api, should', () => {
    it('correctly create restApi', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        expect(api).toBeDefined();
        expect(api).toHaveProperty('content');
        expect(api).toHaveProperty('definition');
        expect(api).toHaveProperty('publish');
        expect(api).toHaveProperty('publishingChannel');
        expect(api).toHaveProperty('repository');
    })

    it('correctly receive and send messages for content api', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        window.addEventListener('message', (event) => {
            if(event.data.type === Message.GET_CONTENT) {
                expect(event.data.value.id).toBe('test');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.LIST_CONTENT) {
                expect(event.data.value.definition).toBe('test-definition');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: [{id: 'test'}, {id: 'test2'}], type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.CREATE_CONTENT) {
                expect(event.data.value.name).toBe('test-new-content');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-new-content'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.UPDATE_CONTENT) {
                expect(event.data.value.name).toBe('test-update-content');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-update-content'}, type: Message.RESULT}, '*');
            }
        })

        const content = await api.content.getContent({id: 'test'});
        expect(content).toBeDefined();
        expect(content.id).toBe('test');

        const contents = await api.content.listContent({definition: 'test-definition'});
        expect(contents).toBeDefined();
        expect(contents.length).toBeGreaterThan(0);

        const newContent = await api.content.createContent({name: 'test-new-content'});
        expect(newContent).toBeDefined();
        expect(newContent.name).toBe('test-new-content');

        const updatedContent = await api.content.updateContent({name: 'test-update-content'});
        expect(updatedContent).toBeDefined();
        expect(updatedContent.name).toBe('test-update-content');
    })

    it('correctly receive and send messages for repository api', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        window.addEventListener('message', (event) => {
            if(event.data.type === Message.GET_REPOSITORY) {
                expect(event.data.value.id).toBe('test');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.LIST_REPOSITORY) {
                expect(event.data.value.name).toBe('test-repository');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: [{id: 'test'}, {id: 'test2'}], type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.CREATE_REPOSITORY) {
                expect(event.data.value.name).toBe('test-new-repository');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-new-repository'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.UPDATE_REPOSITORY) {
                expect(event.data.value.name).toBe('test-update-repository');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-update-repository'}, type: Message.RESULT}, '*');
            }
        })

        const repository = await api.repository.getRepository({id: 'test'});
        expect(repository).toBeDefined();
        expect(repository.id).toBe('test');

        const repositories = await api.repository.listRepository({name: 'test-repository'});
        expect(repositories).toBeDefined();
        expect(repositories.length).toBeGreaterThan(0);

        const newRepository = await api.repository.createRepository({name: 'test-new-repository'});
        expect(newRepository).toBeDefined();
        expect(newRepository.name).toBe('test-new-repository');

        const updatedRepository = await api.repository.updateRepository({name: 'test-update-repository'});
        expect(updatedRepository).toBeDefined();
        expect(updatedRepository.name).toBe('test-update-repository');
    })

    it('correctly receive and send messages for definition api', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        window.addEventListener('message', (event) => {
            if(event.data.type === Message.GET_DEFINITION) {
                expect(event.data.value.id).toBe('test');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.LIST_DEFINITION) {
                expect(event.data.value.name).toBe('test-definition');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: [{id: 'test'}, {id: 'test2'}], type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.CREATE_DEFINITION) {
                expect(event.data.value.name).toBe('test-new-definition');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-new-definition'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.UPDATE_DEFINITION) {
                expect(event.data.value.name).toBe('test-update-definition');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-update-definition'}, type: Message.RESULT}, '*');
            }
        })

        const definition = await api.definition.getDefinition({id: 'test'});
        expect(definition).toBeDefined();
        expect(definition.id).toBe('test');

        const definitions = await api.definition.listDefinition({name: 'test-definition'});
        expect(definitions).toBeDefined();
        expect(definitions.length).toBeGreaterThan(0);

        const newDefinition = await api.definition.createDefinition({name: 'test-new-definition'});
        expect(newDefinition).toBeDefined();
        expect(newDefinition.name).toBe('test-new-definition');

        const updatedDefinition = await api.definition.updateDefinition({name: 'test-update-definition'});
        expect(updatedDefinition).toBeDefined();
        expect(updatedDefinition.name).toBe('test-update-definition');
    })

    it('correctly receive and send messages for publishing-channel api', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        window.addEventListener('message', (event) => {
            if(event.data.type === Message.GET_PUBLISHING_CHANNEL) {
                expect(event.data.value.id).toBe('test');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.LIST_PUBLISHING_CHANNEL) {
                expect(event.data.value.name).toBe('test-publishing-channel');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: [{id: 'test'}, {id: 'test2'}], type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.CREATE_PUBLISHING_CHANNEL) {
                expect(event.data.value.name).toBe('test-new-publishing-channel');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-new-publishing-channel'}, type: Message.RESULT}, '*');
            }
            if(event.data.type === Message.UPDATE_PUBLISHING_CHANNEL) {
                expect(event.data.value.name).toBe('test-update-publishing-channel');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: {id: 'test', name: 'test-update-publishing-channel'}, type: Message.RESULT}, '*');
            }
        })

        const pubCh = await api.publishingChannel.getPublishingChannel({id: 'test'});
        expect(pubCh).toBeDefined();
        expect(pubCh.id).toBe('test');

        const pubChs = await api.publishingChannel.listPublishingChannel({name: 'test-publishing-channel'});
        expect(pubChs).toBeDefined();
        expect(pubChs.length).toBeGreaterThan(0);

        const newPubCh = await api.publishingChannel.createPublishingChannel({name: 'test-new-publishing-channel'});
        expect(newPubCh).toBeDefined();
        expect(newPubCh.name).toBe('test-new-publishing-channel');

        const updatedPubCh = await api.publishingChannel.updatePublishingChannel({name: 'test-update-publishing-channel'});
        expect(updatedPubCh).toBeDefined();
        expect(updatedPubCh.name).toBe('test-update-publishing-channel');
    })

    fit('correctly receive and send messages for publish api', async () => {
        const iframe = createIframe()
        const { channel } = await connectForTest(iframe, {test: 'test'});
        const api = createRestApi(channel);

        window.addEventListener('message', (event) => {
            if(event.data.type === Message.PUBLISH_CONTENT) {
                expect(event.data.value.id).toBe('test');
                iframe.contentWindow?.postMessage({messageId: event.data.messageId, result: true, type: Message.RESULT}, '*');
            }
        })

        const success = await api.publish.publishContent({id: 'test'});
        expect(success).toBeTruthy();
    })
})