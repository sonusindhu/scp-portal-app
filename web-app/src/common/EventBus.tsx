/**
 * Type-safe EventBus for global event communication
 * Provides publish-subscribe pattern for decoupled component communication
 */

// Define known application events for type safety
export const AppEvents = {
  LOGOUT: 'logout',
} as const;

type EventCallback<T = any> = (data: T) => void;

interface IEventBus {
  on<T = any>(event: string, callback: EventCallback<T>): void;
  dispatch<T = any>(event: string, data?: T): void;
  remove<T = any>(event: string, callback?: EventCallback<T>): void;
}

const eventBus: IEventBus = {
  on<T = any>(event: string, callback: EventCallback<T>): void {
    document.addEventListener(event, (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      callback(customEvent.detail);
    });
  },
  
  dispatch<T = any>(event: string, data?: T): void {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  
  remove<T = any>(event: string, callback?: EventCallback<T>): void {
    if (callback) {
      document.removeEventListener(event, callback as EventListener);
    }
  },
};

export default eventBus;
