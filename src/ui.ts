import { Channel } from './channel';
import { Message } from './types';

export default class UI {
  document: Document;
  // Used for resizing automatically
  observer: MutationObserver;
  oldHeight?: number;
  isResizing: boolean = false;

  constructor(private channel: Channel, private currentWindow: Window) {
    this.document = currentWindow.document;
    this.observer = new MutationObserver(this.autoUpdate);
  }

  startResize = () => {
    this.changeHeight();
    if (this.isResizing) {
      return;
    }
    this.isResizing = true;
    this.observer.observe(this.document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });
    this.currentWindow.addEventListener('resize', this.autoUpdate);
  };

  stopResize = () => {
    if (!this.isResizing) {
      return;
    }
    this.isResizing = false;
    this.observer.disconnect();
    this.currentWindow.removeEventListener('resize', this.autoUpdate);
  };

  autoUpdate = () => {
    return this.changeHeight();
  };

  changeHeight = (height?: number) => {
    const heightToSend =
      height === undefined
        ? Math.ceil(document.documentElement.getBoundingClientRect().height)
        : height;
    if (heightToSend !== this.oldHeight) {
      this.channel.send(Message.RESIZE, heightToSend);
      this.oldHeight = heightToSend;
    }
  };
}
