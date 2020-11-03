import { connect } from '../channel';
import { MessageType } from '../types';

describe('channel, should', () => {
    it('connect successfully', (done) => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);

        connect(iframe.contentWindow!, (channel, message) => {
            expect(channel).toBeDefined();
            expect(message).toBeDefined();
            done()
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: MessageType.CONNECT, value: { test: 'test' }}, '*'),
            1000
        )
    })

    it('successfully add handler', (done) => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);

        connect(iframe.contentWindow!, (channel) => {
            channel.addMessageHandler(MessageType.GET_VALUE, (value: any) => {
                expect(value).toBeDefined();
            })
            expect(channel.messageHandlers[MessageType.GET_VALUE].length).toBe(1);

            done()
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: MessageType.CONNECT, value: { test: 'test' }}, '*'),
            1000
        )
    })

    it('add handler and successfully trigger', (done) => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);

        connect(iframe.contentWindow!, (channel) => {
            channel.addMessageHandler(MessageType.GET_VALUE, (data: any) => {
                const { value } = data.value;
                expect(value).toBe('test');
            })
            expect(channel.messageHandlers[MessageType.GET_VALUE].length).toBe(1);

            
            window.addEventListener('message', message => {
                if(message.data.type === MessageType.GET_VALUE) {
                    iframe.contentWindow?.postMessage({messageId: message.data.messageId, source: 'test-field', type: MessageType.RESULT, value: {value: 'test'}, result: {value: 'test'}}, '*');
                }
            })
            
            channel.call(MessageType.GET_VALUE, {}).then((result: any) => {
                expect(result.value).toEqual('test');
                done();
            });
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: MessageType.CONNECT, value: { test: 'test' }}, '*'),
            1000
        );
    })

    it('send one-off event', (done) => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);

        window.addEventListener('message', (event) => {
            expect(event.data.type).toBe('test');
            iframe.contentWindow?.postMessage({source: 'test-field', type: 'test', value: { test: 'test' }}, '*');
        })
        
        connect(iframe.contentWindow!, (channel) => {
            
            channel.addMessageHandler('test' as MessageType, (data: any) => {
                expect(data.value.test).toEqual('test')
                done();
            })

            channel.send('test', {value: 'test'});
        })

        setTimeout(
            () => iframe.contentWindow?.postMessage({source: 'test-field', type: MessageType.CONNECT, value: { test: 'test' }}, '*'),
            1000
        );
    })
})