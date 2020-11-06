import { MessagePayload, Message } from './types';
import { Channel } from './channel';

export class SchemaField {
    private schemaError: any = {};
    constructor(private channel: Channel, private value: any) {

        channel.addMessageHandler(Message.VALUE_CHANGED, (payload: MessagePayload) => {
            this.value = payload.value;
        });

        channel.addMessageHandler(Message.SCHEMA_FIELD_ERROR, (payload: MessagePayload) => {
            this.schemaError = payload.schemaError;
        })

    }

    getFieldValue() {
        return this.value;
    }

    setFieldValue(value: any) {
        this.value = value;
        return this.channel.call(Message.SET_VALUE, this.value);
    }

    getSchemaError() {
        return this.schemaError;
    }
}