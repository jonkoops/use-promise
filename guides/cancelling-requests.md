# Cancelling Fetch Requests

For performance reasons you might want to cancel a fetch request. For example, the user might navigate away from the page before a large file (such as a video) has finished loading. To do so you can pass an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) into the fetch call.

Let's change the `fetchUser` function from the [Getting Started](./getting-started.md) guide so that it can cancel the request.

```ts
async function fetchUser(id: string, signal: AbortSignal): Promise<User> {
  const response = fetch(`/api/users/${id}`, { signal })

  if (!response.ok) {
    throw new Error('Response is not ok')
  }

  return response.json()
}
```

Now that we are passing along the signal to the fetch call we also need to provide it when we call our function.

```ts
const result = usePromise((signal) => fetchUser(userId, signal), [userId])
```

Here `usePromise` provides us with a signal directly from the function that creates our promise. This signal will be triggered whenever the component it is used in is unmounted, or when the dependencies have changed. This means that our fetch request will be cancelled if we no longer need its result.