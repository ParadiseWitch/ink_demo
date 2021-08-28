export interface EventData {
  kind: string;
  payload: any;
}

export class FileCopyConsumer {

  private callbacks: Function[];
  constructor() {
    this.callbacks = []
  }

  onEvent(fn: Function) {
    this.callbacks.push(fn);
  }

  // 通知事件调用
  onDone(event: EventData) {
    this.callbacks.forEach(callback => callback(event))
  }
}