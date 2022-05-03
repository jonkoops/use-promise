import type { DependencyList } from "react";
import { useEffect, useState } from "react";

export type PromiseResult<T> = PromisePendingResult | PromiseSettledResult<T>;

export interface PromisePendingResult {
  status: "pending";
}

/**
 * Function that creates a promise, takes a signal to abort fetch requests.
 */
export type PromiseFactoryFn<T> = (signal: AbortSignal) => Promise<T>;

/**
 * Determines if the result of a promise is pending.
 * @param result Result to check.
 */
export const isPending = <T>(
  result: PromiseResult<T>
): result is PromisePendingResult => result.status === "pending";

/**
 * Determines if the result of a promise is fulfilled.
 * @param result Result to check.
 */
export const isFulfilled = <T>(
  result: PromiseResult<T>
): result is PromiseFulfilledResult<T> => result.status === "fulfilled";

/**
 * Determines if the result of a promise is rejected.
 * @param result Result to check.
 */
export const isRejected = <T>(
  result: PromiseResult<T>
): result is PromiseRejectedResult => result.status === "rejected";

/**
 * Takes a function that creates a Promise and returns its pending, fulfilled, or rejected result.
 *
 * ```ts
 * const result = usePromise(() => fetch('/api/products'))
 * ```
 *
 * Also takes a list of dependencies, when the dependencies change the promise is recreated.
 *
 * ```ts
 * const result = usePromise(() => fetch(`/api/products/${id}`), [id])
 * ```
 *
 * Can abort a fetch request, a [signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) is provided from the factory function to do so.
 *
 * ```ts
 * const result = usePromise(signal => fetch(`/api/products/${id}`, { signal }), [id])
 * ```
 *
 * @param factory Function that creates the promise.
 * @param deps If present, promise will be recreated if the values in the list change.
 */
export default function usePromise<T>(
  factory: PromiseFactoryFn<T>,
  deps: DependencyList = []
): PromiseResult<T> {
  const [result, setResult] = useState<PromiseResult<T>>({ status: "pending" });

  useEffect(() => {
    if (!isPending(result)) {
      setResult({ status: "pending" });
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function handlePromise() {
      const [promiseResult] = await Promise.allSettled([factory(signal)]);

      if (!signal.aborted) {
        setResult(promiseResult);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handlePromise();

    return () => controller.abort();
  }, deps);

  return result;
}
