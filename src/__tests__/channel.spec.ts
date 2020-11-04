import { connect } from '../channel';
import { Message } from '../types';
import { createIframe } from './frameUtils';

describe('channel, should', () => {
    let iframe: HTMLIFrameElement;
    beforeEach(() => {
        iframe = createIframe();
    })
    it('connect successfully', (done) => {
        connect(iframe.contentWindow!, (channel, message) => {
            expect(channel).toBeDefined();
            expect(message).toBeDefined();
            done()
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: Message.CONNECT, value: { test: 'test' }}, '*'),
            1000
        )
    })

    it('successfully add handler', (done) => {
        connect(iframe.contentWindow!, (channel) => {
            channel.addMessageHandler(Message.GET_VALUE, (value: any) => {
                expect(value).toBeDefined();
            })
            expect(channel.messageHandlers[Message.GET_VALUE].length).toBe(1);

            done()
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: Message.CONNECT, value: { test: 'test' }}, '*'),
            1000
        )
    })

    it('add handler and successfully trigger', (done) => {
        connect(iframe.contentWindow!, (channel) => {
            channel.addMessageHandler(Message.GET_VALUE, (data: any) => {
                const { value } = data.value;
                expect(value).toBe('test');
            })
            expect(channel.messageHandlers[Message.GET_VALUE].length).toBe(1);

            
            window.addEventListener('message', message => {
                if(message.data.type === Message.GET_VALUE) {
                    iframe.contentWindow?.postMessage({messageId: message.data.messageId, source: 'test-field', type: Message.RESULT, value: {value: 'test'}, result: {value: 'test'}}, '*');
                }
            })
            
            channel.call(Message.GET_VALUE, {}).then((result: any) => {
                expect(result.value).toEqual('test');
                done();
            });
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: Message.CONNECT, value: { test: 'test' }}, '*'),
            1000
        );
    })

    it('send one-off event', (done) => {
        window.addEventListener('message', (event) => {
            expect(event.data.type).toBe('test');
            iframe.contentWindow?.postMessage({source: 'test-field', type: 'test', value: { test: 'test' }}, '*');
        })
        
        connect(iframe.contentWindow!, (channel) => {
            
            channel.addMessageHandler('test' as Message, (data: any) => {
                expect(data.value.test).toEqual('test')
                done();
            })

            channel.send('test', {value: 'test'});
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: Message.CONNECT, value: { test: 'test' }}, '*'),
            1000
        );
    })
})