import { createRestApi } from '../api';
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
})