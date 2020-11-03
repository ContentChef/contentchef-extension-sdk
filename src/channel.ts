import { MessagePayload, MessageType } from './types';

export function connect (currentWindow: Window, onSuccess: (channel: Channel, message: any) => void) {
    waitForConnection(currentWindow, (initializationMessage: any) => {
        const channel = new Channel(initializationMessage.source, currentWindow);
        onSuccess(channel, initializationMessage);
    });    
} 

function waitForConnection(currentWindow: Window, onSuccess: Function) {

    const onConnectListener = (event: MessageEvent) => {
        const message = event.data;
        if(
            message.type === MessageType.CONNECT
        ) {
            currentWindow.removeEventListener('message', onConnectListener);
            onSuccess(message);
        }
    }
    currentWindow.addEventListener('message', onConnectListener);
}

function createSendFunction(source: string, parentWindow: Window) {
    let messageCount = 0;
    return (type: MessageType, value: any) => {
        const id = messageCount++;
        parentWindow.postMessage(<MessagePayload>{
            type,
            value,
            messageId: id,
            source
        }, '*');

        return id;
    }
    
}

export class Channel {
    parentWindow: Window;
    responseHandlers: { [ id: string]: {resolve: Function, reject: Function}} = {};
    messageHandlers: { [eventType: string]: Function[] } = {};
    sendEvent: ReturnType<typeof createSendFunction>;
    constructor(source: string, currentWindow: Window) {
        this.parentWindow = currentWindow.parent;
        this.sendEvent = createSendFunction(source, this.parentWindow);
        currentWindow.addEventListener('message', (event) => {
            this.handleMessage(event);
        })
    }

    handleMessage(event: MessageEvent<MessagePayload>) {
        if('result' in event.data) {
            const responseHandler = this.responseHandlers[event.data.messageId];
            responseHandler.resolve(event.data.result);
            delete this.responseHandlers[event.data.messageId];
            return;
        } 
        if ('error' in event.data) {
            const responseHandler = this.responseHandlers[event.data.messageId];
            responseHandler.reject(event.data.error);
            delete this.responseHandlers[event.data.messageId];
            return;
        }
        const handlers = this.messageHandlers[event.data.type] || [];
        handlers.map(handler => {
            handler(event.data);
        })
    }

    send(type: string, value: any) {
        this.sendEvent(type as MessageType, value);
    }

    // For promise like behaviour / for api calls on main app
    call(type: string, value: any) {

        const messageId = this.sendEvent(type as MessageType, value);

        return new Promise((resolve, reject) => {
            this.responseHandlers[messageId] = { resolve, reject }
        });
        
    }

    addMessageHandler(event: MessageType, handler: Function) {
        if(this.messageHandlers[event]) {
            this.messageHandlers[event].push(handler);
            return;
        }
        this.messageHandlers[event] = [handler];
        return;
    }
}
