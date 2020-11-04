import { MessagePayload, Message } from './types';
import { Channel } from './channel';

export class SchemaField {
    schemaError: any = {};
    constructor(private channel: Channel, private field: any) {

        channel.addMessageHandler(Message.VALUE_CHANGED, (payload: MessagePayload) => {
            this.field = payload.value;
        });

        channel.addMessageHandler(Message.SCHEMA_FIELD_ERROR, (payload: MessagePayload) => {
            this.schemaError = payload.error;
        })

    }

    getField() {
        return this.field;
    }

    setField(field: any) {
        this.field = field;
        return this.channel.call(Message.SET_VALUE, this.field);
    }

    getSchemaError() {
        return this.schemaError;
    }
}