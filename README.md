# usePromise

Making Promises in your components a breeze 🌬️

## Installation

Install usePromise using [`yarn`](https://yarnpkg.com/en/package/@amsterdam/use-promise):

```bash
yarn add @amsterdam/use-promise
```

Or [`npm`](https://www.npmjs.com/package/@amsterdam/use-promise):

```bash
npm install @amsterdam/use-promise
```

## Getting Started

Let's get started by writing a hypothetical component that fetches and shows user details. First, create a `UserDetails.ts` file:

```ts
import { fetchUser } from './api/user'

interface UserDetailsProps {
  userId: string
}

const UserDetails = ({ userId }: UserDetailsProps) => {

}

export default UserDetails
```

The hypothetical `fetchUser` function imported in this file fetches a user by its id and returns a Promise with that user's details. Let's add some code to manage the result of this function.

```tsx
import usePromise, { PromiseStatus } from '@amsterdam/use-promise'
import { fetchUser } from './api/user'

interface UserDetailsProps {
  userId: string
}

const UserDetails = ({ userId }: UserDetailsProps) => {
  const result = usePromise(() => fetchUser(userId), [userId])

  if (result.status === PromiseStatus.Pending) {
    return <p>Fetching user information&hellip;</p>
  }

  if (results.status === PromiseStatus.Rejected) {
    return <p>Something went wrong fetching the user information: ${result.error.message}</p>
  }

  return <p>You're looking at the user information of ${result.value.firstName}!<p>
}

export default UserDetails
```

Let's break this example down to the essentials, starting with the `usePromise` hook.

```ts
const result = usePromise(() => fetchUser(userId), [userId])
```

First off, we pass a function as the first argument. This is the factory function that is responsible for creating our promise.

This function is called when our component is mounted, or if the dependencies passed in as the second argument change. This is essentially the same as the [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook.

The `usePromise` function returns a special object that contains the `status` of the Promise and some other fields. Using this `status` field we can determine what to show the user.

```tsx
if (result.status === PromiseStatus.Pending) {
  return <p>Fetching user information&hellip;</p>
}

if (results.status === PromiseStatus.Rejected) {
  return <p>Something went wrong fetching the user information: ${result.error.message}</p>
}
```

Here we are handling the different statuses of the Promise to inform the user about what is going on. When the status is `Pending` we show some loading state, and if it is `Rejected` we inform the user that something went wrong. If the status is `Rejected` we can also retrieve the `error` value from the Promise to find out exactly what went wrong.

There are 3 possible statuses:
- `Pending` - The Promise is in-flight, meaning it was not yet resolved or rejected.
- `Rejected` - The Promise is rejected, something went wrong.
- `Resolved` - The Promise is resolved, all went well.

On the last line of our component we can now safely assume that the status is `Resolved` as we already checked all other possible statuses. This means that we can now also access the `value` property to get the resolved value of the Promise.

```tsx
return <p>You're looking at the user information of ${result.value.firstName}!<p>
```

That's it, you're now the master of Promises! 💪
