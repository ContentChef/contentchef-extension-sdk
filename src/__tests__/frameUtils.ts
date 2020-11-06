import { connect } from '../channel';
import { Message } from '../types';

export function createIframe() {
  const iframe = document.createElement('iframe');
  document.body.append(iframe);

  return iframe;
}

export async function connectForTest(
  iframe: HTMLIFrameElement,
  message: any
): Promise<any> {
  return new Promise(resolve => {
    connect(iframe.contentWindow!, (channel, message) => {
      expect(channel).toBeDefined();
      expect(message).toBeDefined();
      resolve({ channel, message });
    });

    setTimeout(
      () =>
        iframe.contentWindow?.postMessage(
          { source: 'test-field', type: Message.CONNECT, value: message },
          '*'
        ),
      500
    );
  });
}

export function wait(milliseconds: number = 200) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
}
