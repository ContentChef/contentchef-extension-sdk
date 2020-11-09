import { Message } from '../types';
import UI from '../ui';
import { connectForTest, createIframe } from './frameUtils';

describe('UI, should', () => {
  it('correctly initialize UI', async () => {
    const iframe = createIframe();
    const { channel } = await connectForTest(iframe, { field: 'string-value' });
    const ui = new UI(channel, iframe.contentWindow!);
    expect(ui).toBeDefined();
    expect(ui.document).toBeDefined();
    expect(ui.observer).toBeDefined();
  });

  it('correctly change height', async done => {
    const iframe = createIframe();
    const { channel } = await connectForTest(iframe, { field: 'string-value' });
    const ui = new UI(channel, iframe.contentWindow!);

    const listener = (event: MessageEvent) => {
      if (event.data.type === Message.RESIZE) {
        expect(event.data.value).toBe(20);
        window.removeEventListener('message', listener);
        done();
      }
    };

    window.addEventListener('message', listener);

    ui.changeHeight(20);
  });
});
