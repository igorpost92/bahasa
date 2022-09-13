type Handler = () => void;

type Listeners<T extends string> = Record<T, Set<Handler> | undefined>;

export class Notifier<T extends string> {
  listeners: Listeners<T> = {} as any;

  subscribe = (event: T, listener: Handler) => {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event]!.add(listener);
  };

  unsubscribe = (event: T, listener: Handler) => {
    this.listeners[event]?.delete(listener);
  };

  notify = (event: T) => {
    // TODO: notify only one time if one listener for few events

    const handlers = this.listeners[event];
    handlers?.forEach(handler => handler());
  };
}
