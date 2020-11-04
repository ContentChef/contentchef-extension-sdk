export enum Message {
    // SYSTEM
    CONNECT = 'connect',
    RESULT = 'result',
    ERROR = 'error',

    // UI
    RESIZE = 'resize',

    // FIELD
    GET_VALUE = 'getValue',
    SET_VALUE = 'setValue',
    SCHEMA_FIELD_ERROR = 'schemaFieldError',
    VALUE_CHANGED= 'valueChanged',

    // API
    // CONTENT
    GET_CONTENT = 'getContent',
    LIST_CONTENT = 'listContent',
    CREATE_CONTENT = 'createContent',
    UPDATE_CONTENT = 'updateContent',
    // DEFINITION
    GET_DEFINITION = 'getDefinition',
    LIST_DEFINITION = 'listDefinition',
    CREATE_DEFINITION = 'createDefinition',
    UPDATE_DEFINITION = 'updateDefinition',
    // REPOSITORY
    GET_REPOSITORY = 'getRepository',
    LIST_REPOSITORY = 'listRepository',
    CREATE_REPOSITORY = 'createRepository',
    UPDATE_REPOSITORY = 'updateRepository',
    // PUBLISHINGCHANNEL
    GET_PUBLISHING_CHANNEL = 'getPublishingChannel',
    LIST_PUBLISHING_CHANNEL = 'listPublishingChannel',
    CREATE_PUBLISHING_CHANNEL = 'createPublishingChannel',
    UPDATE_PUBLISHING_CHANNEL = 'updatePublishingChannel',

    // PUBLISH
    PUBLISH_CONTENT = 'publishContent'
}

export type SystemMessage = Message.CONNECT | Message.RESULT | Message.ERROR;
export type UIMessage = Message.RESIZE;
export type FieldMessage = Message.GET_VALUE | Message.SET_VALUE | Message.SCHEMA_FIELD_ERROR | Message.VALUE_CHANGED;
export type APIContentMessage = Message.GET_CONTENT | Message.LIST_CONTENT | Message.CREATE_CONTENT | Message.UPDATE_CONTENT;
export type APIDefinitionMessage = Message.GET_DEFINITION | Message.LIST_DEFINITION | Message.CREATE_DEFINITION | Message.UPDATE_DEFINITION;
export type APIRepositoryMessage = Message.GET_REPOSITORY | Message.LIST_REPOSITORY | Message.CREATE_REPOSITORY | Message.UPDATE_REPOSITORY;
export type APIPublishingChannelMessage = Message.GET_PUBLISHING_CHANNEL | Message.LIST_PUBLISHING_CHANNEL | Message.CREATE_PUBLISHING_CHANNEL | Message.UPDATE_PUBLISHING_CHANNEL;
export type APIPublishMessage = Message.PUBLISH_CONTENT;

type MessageType = SystemMessage | UIMessage | FieldMessage | APIContentMessage | APIDefinitionMessage | APIRepositoryMessage | APIPublishingChannelMessage | APIPublishMessage;

export type APIFunction = (filters: any) => Promise<any>;

export type API<T extends MessageType> = {
    [K in T]: APIFunction;
}

export interface MessagePayload {
    type: Message;
    value?: any;
    field?: any;
    containerId?: string;
    messageId: number;
    source: string;
    result?: any;
    error?: any;
    schemaError?: any;
}