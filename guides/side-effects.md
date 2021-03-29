# Handling Side-effects

Handling side-effects from `usePromise` can be done by passing the result to `useEffect`. For example, let's change the code from the [Getting Started](./getting-started.md) guide by handling changes to the title of the document in a side-effect.

```tsx
const result = usePromise(() => fetchUser(userId), [userId])

useEffect(() => {
  if (!isFulfilled(result)) {
    return
  }

  const originalTitle = document.title

  document.title = `User Details | ${result.value.name}`

  return () => {
    document.title = originalTitle
  }
}, [result])
```

Whenever the status of the promise changes the entire `result` object is recreated. This means that we can pass it as a dependency to `useEffect`, which will be triggered whenever the status changes.
