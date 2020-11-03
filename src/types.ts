export enum MessageType {
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
    UPDATE_REPOSITORY = 'update_repository',
    // PUBLISHINGCHANNEL
    GET_PUBLISHING_CHANNEL = 'getPublishing_channel',
    LIST_PUBLISHING_CHANNEL = 'listPublishing_channel',
    CREATE_PUBLISHING_CHANNEL = 'createPublishing_channel',
    UPDATE_PUBLISHING_CHANNEL = 'updatePublishing_channel',

    // PUBLISH
    PUBLISH_CONTENT = 'publishContent'
}

export interface API {
    [key: string]: (filters: any) => Promise<unknown>;
}

export interface MessagePayload {
    type: MessageType;
    value?: any;
    field?: any;
    containerId?: string;
    messageId: number;
    source: string;
    result?: any;
    error?: any
}