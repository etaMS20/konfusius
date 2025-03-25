import { BehaviorSubject, filter, fromEvent, Observable } from 'rxjs';

/**
 * Abstract base class for storage operations.
 * Provides utility methods to interact with web storage (localStorage/sessionStorage).
 */
export abstract class BaseStorage {
  /** map of BehaviorSubjects to track changes in stored values. */
  private readonly storageSubjects: Map<string, BehaviorSubject<any>> =
    new Map();

  constructor(private readonly storage: Storage) {
    // Listen for changes in localStorage across browser tabs
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(filter((event) => event.key !== null))
      .subscribe((event) => {
        if (event.key && this.storageSubjects.has(event.key)) {
          const newValue = this.getItem(event.key);
          this.storageSubjects.get(event.key)?.next(newValue);
        }
      });
  }

  /**
   * Saves an item in storage and notifies subscribers.
   * @param key The key to store the value under.
   * @param value The value to store (serialized to JSON).
   */
  setItem<T>(key: string, value: T): void {
    if (!key) return;

    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error: any) {
      this.clear();
      this.storage.setItem(key, JSON.stringify(value));
    }

    // Notify subscribers
    this.getOrCreateSubject<T>(key).next(value);
  }

  /**
   * Retrieves a deserialized value from storage.
   * @param key The key to retrieve.
   * @param defaultValue Default value if key does not exist.
   * @returns The stored value or defaultValue.
   */
  getItem<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.storage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error: any) {
        this.removeItem(key); // Remove invalid data
        return;
      }
    }
    return defaultValue;
  }

  /**
   * Returns an observable that emits the current and future values of a storage item.
   * Ensures subscription always works, even if the key is added later.
   * @param key The key of the item to observe.
   * @param defaultValue A default value if the key does not exist.
   * @returns An observable that emits when the value changes.
   */
  getItem$<T>(key: string, defaultValue?: T): Observable<T | undefined> {
    return this.getOrCreateSubject<T>(key, defaultValue).asObservable();
  }

  /**
   * Removes an item from storage and notifies subscribers.
   * @param key The key to remove.
   */
  removeItem(key: string): void {
    this.storage.removeItem(key);
    this.storageSubjects.get(key)?.next(undefined); // Notify subscribers
  }

  /** Clears all stored data. */
  clear(): void {
    this.storage.clear();
    this.storageSubjects.forEach((subject) => subject.next(undefined));
  }

  /**
   * Ensures a BehaviorSubject exists for the given key.
   * If the key does not exist in storage, initializes with the default value.
   * @param key The key to observe.
   * @param defaultValue Default value if key does not exist.
   * @returns A BehaviorSubject tracking changes to the key.
   */
  private getOrCreateSubject<T>(
    key: string,
    defaultValue?: T,
  ): BehaviorSubject<T | undefined> {
    if (!this.storageSubjects.has(key)) {
      this.storageSubjects.set(
        key,
        new BehaviorSubject<T | undefined>(this.getItem<T>(key, defaultValue)),
      );
    }
    return this.storageSubjects.get(key)!;
  }
}
