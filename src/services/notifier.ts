type Events = 'words-update' | 'categories-update';

type Handler = () => void;

type Listeners = Record<Events, Set<Handler> | undefined>;

class Notifier {
  listeners: Listeners = {} as any;

  subscribe = (event: Events, listener: Handler) => {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event]!.add(listener);
  };

  unsubscribe = (event: Events, listener: Handler) => {
    this.listeners[event]?.delete(listener);
  };

  notify = (event: Events) => {
    // TODO: notify only one time if one listener for few events

    const handlers = this.listeners[event];
    handlers?.forEach(handler => handler());
  };
}

export const notifier = new Notifier();
