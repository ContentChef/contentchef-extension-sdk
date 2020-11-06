import { SchemaField } from '../schema_field';
import { Message } from '../types';
import { connectForTest, createIframe, wait } from './frameUtils';

describe('SchemaField, should', () => {
  it('correctly create SchemaField', async () => {
    const iframe = createIframe();
    const { channel, message } = await connectForTest(iframe, {
      field: 'string-value',
    });
    expect(message.value.field).toBe('string-value');
    const schemaField = new SchemaField(channel, message.value.field);
    expect(schemaField).toBeDefined();
  });

  it('correctly handle value changed event', async () => {
    const iframe = createIframe();
    const { channel, message } = await connectForTest(iframe, {
      field: 'string-value',
    });
    const schemaField = new SchemaField(channel, message.value.field);
    expect(schemaField.getFieldValue()).toEqual('string-value');

    iframe.contentWindow?.postMessage(
      { type: Message.VALUE_CHANGED, value: 'new-string-value' },
      '*'
    );

    await wait();

    expect(schemaField.getFieldValue()).toBe('new-string-value');
  });

  it('correctly handle schema error event', async () => {
    const iframe = createIframe();
    const { channel, message } = await connectForTest(iframe, {
      field: 'string-value',
    });
    const schemaField = new SchemaField(channel, message.value.field);
    expect(schemaField.getFieldValue()).toEqual('string-value');
    expect(schemaField.getSchemaError()).toEqual({});

    iframe.contentWindow?.postMessage(
      {
        type: Message.SCHEMA_FIELD_ERROR,
        schemaError: { validations: [], errorType: 'test' },
      },
      '*'
    );

    await wait();

    expect(schemaField.getSchemaError()).toMatchObject({
      validations: [],
      errorType: 'test',
    });
  });

  it('correctly setField', async () => {
    const iframe = createIframe();
    const { channel, message } = await connectForTest(iframe, {
      field: 'string-value',
    });
    const schemaField = new SchemaField(channel, message.value.field);
    expect(schemaField.getFieldValue()).toEqual('string-value');

    window.addEventListener('message', event => {
      if (event.data.type === Message.SET_VALUE) {
        expect(event.data.value).toBe('new-string-value');
        iframe.contentWindow?.postMessage(
          {
            type: Message.RESULT,
            messageId: event.data.messageId,
            result: { success: true, value: 'new-string-value' },
          },
          '*'
        );
      }
    });

    const result: any = await schemaField.setFieldValue('new-string-value');

    expect(result.success).toBeTruthy();
    expect(result.value).toEqual('new-string-value');
  });
});
