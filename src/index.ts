import { createRestApi } from './api';
import { connect } from './channel';
import { SchemaField } from './schema_field';
import {
  API,
  APIContentMessage,
  APIDefinitionMessage,
  APIPublishingChannelMessage,
  APIPublishMessage,
  APIRepositoryMessage,
} from './types';
import UI from './ui';

export interface SDK {
  api: {
    content: API<APIContentMessage>;
    publishingChannel: API<APIPublishingChannelMessage>;
    repository: API<APIRepositoryMessage>;
    definition: API<APIDefinitionMessage>;
    publish: API<APIPublishMessage>;
  };
  ui: UI;
  field: SchemaField;
}

function initialize(currentWindow: Window) {
  const connectDeferred = createDeferred();

  connect(currentWindow, (...args) => connectDeferred.resolve(args));

  return (callback: (sdk: SDK) => any) => {
    connectDeferred.promise.then(([channel, initMessage]) => {
      const restApi = createRestApi(channel);
      const ui = new UI(channel, currentWindow);
      const field = new SchemaField(channel, initMessage.field);

      const sdk = {
        api: { ...restApi },
        ui,
        field,
      };

      callback(sdk);
    });
  };
}

function createDeferred<T = any>() {
  const deferred: {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
  } = {
    promise: null as any,
    resolve: null as any,
  };

  deferred.promise = new Promise<T>(resolve => {
    deferred.resolve = resolve;
  });

  return deferred;
}

export default function initSDK(callback: (sdk: any) => any) {
  return initialize(window)(callback);
}
