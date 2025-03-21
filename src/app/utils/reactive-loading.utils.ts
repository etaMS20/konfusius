import { defer, finalize, Observable, Subject } from 'rxjs';

/**
 * Reactive contextual loading approach using custom rxjs operators
 */

/**
 * Operator invoking a callback upon subscription with defer
 * @param callback Callback
 * @returns Observable
 */
export function prepare<T>(
  callback: () => void,
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}

/**
 * @param indicator Subject as sink for loading state
 * @returns Observable stream output loading state
 */
export function indicate<T>(
  indicator: Subject<boolean>,
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false)),
    );
}
