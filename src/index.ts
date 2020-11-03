import { createRestApi } from './api';
import { Channel, connect } from './channel';
import { SchemaField } from './schema_field';
import UI from './ui';

function initialize(currentWindow: Window) {
    const connectDeferred = createDeferred();

    connect(currentWindow, (...args) => connectDeferred.resolve(args));

    return (callback: (sdk: any) => any) => {
        connectDeferred.promise.then(([channel, initMessage]: [Channel, any]) => {
            const restApi = createRestApi(channel);
            const ui = new UI(channel, currentWindow);
            const field = new SchemaField(channel, initMessage);

            const api = {
                api: {...restApi},
                ui,
                field
            };

            callback(api);
        })
    }
}

function createDeferred<T = any>() {
    const deferred: {
      promise: Promise<T>
      resolve: (value: T | PromiseLike<T>) => void
    } = {
      promise: null as any,
      resolve: null as any
    }
  
    deferred.promise = new Promise<T>(resolve => {
      deferred.resolve = resolve
    })
  
    return deferred;
  }

export default function initSDK(callback: (sdk: any) => any) {
    return initialize(window)(callback);
}