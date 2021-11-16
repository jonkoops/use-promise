/* eslint-disable @typescript-eslint/ban-ts-comment */
import { act, renderHook } from '@testing-library/react-hooks'
import usePromise, { isFulfilled, isPending, isRejected } from './usePromise'

// This promise never resolves or rejects, making it useful for testing the pending state.
const UNSETTLED_PROMISE = new Promise(() => {})

describe('isPending', () => {
  it('checks if a result is pending', () => {
    expect(isPending({ status: 'pending' })).toBe(true)
  })
})

describe('isFulfilled', () => {
  it('checks if a result is fulfilled', () => {
    expect(isFulfilled({ status: 'fulfilled', value: null })).toBe(true)
  })
})

describe('isRejected', () => {
  it('checks if a result is rejected', () => {
    expect(isRejected({ status: 'rejected', reason: null })).toBe(true)
  })
})

describe('usePromise', () => {
  it('returns a pending result', () => {
    const { result } = renderHook(() => usePromise(() => UNSETTLED_PROMISE))

    expect(result.current).toEqual({ status: 'pending' })
  })

  it('returns a fulfilled result', async () => {
    const value = 'foo'
    const { result, waitForValueToChange } = renderHook(() =>
      usePromise(() => Promise.resolve(value)),
    )

    await waitForValueToChange(() => result.current)

    expect(result.current).toEqual({ status: 'fulfilled', value })
  })

  it('returns a rejected result', async () => {
    const reason = new Error('Whoopsie')
    const { result, waitForValueToChange } = renderHook(() =>
      usePromise(() => Promise.reject(reason)),
    )

    await waitForValueToChange(() => result.current)

    expect(result.current).toEqual({ status: 'rejected', reason })
  })

  it('updates the result when dependencies change', async () => {
    let currentCount = 0
    let retryCount = 0

    async function nextNumber() {
      // eslint-disable-next-line no-plusplus
      return Promise.resolve(currentCount++)
    }

    const { result, rerender, waitForValueToChange } = renderHook(() =>
      usePromise(() => nextNumber(), [retryCount]),
    )

    await waitForValueToChange(() => result.current)

    retryCount = 1
    rerender()

    expect(result.current).toEqual({ status: 'pending' })

    await waitForValueToChange(() => result.current)

    expect(result.current).toEqual({ status: 'fulfilled', value: 1 })
  })

  it('aborts when unmounted before the promise was settled', () => {
    let currentSignal: AbortSignal
    const { unmount } = renderHook(() =>
      usePromise((signal) => {
        currentSignal = signal
        return UNSETTLED_PROMISE
      }, []),
    )

    unmount()

    // @ts-ignore
    expect(currentSignal.aborted).toBe(true)
  })

  it('aborts when dependencies change before the promise was settled', () => {
    let isCancelled = false
    let currentSignal: AbortSignal
    const { rerender } = renderHook(() =>
      usePromise(
        (signal) => {
          if (!isCancelled) {
            currentSignal = signal
          }

          return UNSETTLED_PROMISE
        },
        [isCancelled],
      ),
    )

    isCancelled = true
    rerender()

    // @ts-ignore
    expect(currentSignal.aborted).toBe(true)
  })

  it('prevents setting the result when aborted before the promise was settled', async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(resolve)
    })
    const { result, unmount } = renderHook(() => usePromise(() => promise))

    unmount()
    await act(() => promise)

    expect(result.current).toEqual({ status: 'pending' })
  })
})
