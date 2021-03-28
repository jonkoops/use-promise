# Getting Started

Let's take the example below, a component that fetches and shows user information.

```tsx
import usePromise, { isPending, isRejected } from '@amsterdam/use-promise'

interface User {
  id: string
  name: string
}

async function fetchUser(id: string): Promise<User> {
  const response = fetch(`/api/users/${id}`)

  if (!response.ok) {
    throw new Error('Response is not ok')
  }

  return response.json()
}

interface UserDetailsProps {
  userId: string
}

const UserDetails = ({ userId }: UserDetailsProps) => {
  const result = usePromise(() => fetchUser(userId), [userId])

  if (isPending(result)) {
    return <p>Fetching user information&hellip;</p>
  }

  if (isRejected(result)) {
    return <p>Something went wrong: {result.reason.message}</p>
  }

  return <p>You're looking at the user information of {result.value.name}!<p>
}

export default UserDetails
```

Let's break this example down, starting with the `usePromise` hook.

```ts
const result = usePromise(() => fetchUser(userId), [userId])
```

We pass a function as the first argument, it is responsible for creating new our promise. The function is called when our component is mounted, or if the dependencies passed in as the second argument change.

The `usePromise` function returns an object that contains the `status` of the promise together with its `value` (if fulfilled), or `reason` (if rejected). To make it easier to check the different statuses of the result there are 3 methods that can be used:

- `isPending()` - The status is `pending`, the promise has not yet been resolved or rejected.
- `isFulfilled()` - The status is `fulfilled`, the promise has been resolved.
- `isRejected()` - The status is `rejected`, the promise has been rejected.

Getting back to our example, we can use these methods to present the user with loading and error states.

```tsx
if (isPending(result)) {
  return <p>Fetching user information&hellip;</p>
}

if (isRejected(result)) {
  return <p>Something went wrong: {result.reason.message}</p>
}
```

On the last line of our component we can now safely assume that the status is `fulfilled` as we already checked all other possible statuses. This means that we can now safely access the `value` property to get the resolved value of the Promise.

```tsx
return <p>You're looking at the user information of {result.value.name}!<p>
```

## Other Guides
- [Handling Side-effects](./side-effects.md)
- [Cancelling Fetch Requests](./cancelling-requests.md)
