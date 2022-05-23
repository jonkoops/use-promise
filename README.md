# usePromise &middot; [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/jonkoops/use-promise/blob/main/LICENSE.md) [![npm version](https://img.shields.io/npm/v/@jonkoops/use-promise.svg?style=flat)](https://www.npmjs.com/package/@jonkoops/use-promise)

Making Promises in your components a breeze 🌬️

## Features
- Handle the result of your Promises easily.
- Familiar handling of side effects using `useEffect`.
- Easy cancellation of fetch requests with `AbortSignal`.
- TypeScript support out of the box.

For more information see the [Getting Started](./guides/getting-started.md) guide.

## Installation

Install usePromise using [`yarn`](https://yarnpkg.com/en/package/@jonkoops/use-promise):

```bash
yarn add @jonkoops/use-promise
```

Or [`npm`](https://www.npmjs.com/package/@jonkoops/use-promise):

```bash
npm install @jonkoops/use-promise
```

## Guides
- [Getting Started](./guides/getting-started.md)
- [Handling Side-effects](./guides/side-effects.md)
- [Cancelling Fetch Requests](./guides/cancelling-requests.md)

## Compatibility

This library will work in every environment (Node or browser) that supports [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal), [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) and [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). If you need to support an environment that does not have these features make sure to include the appropriate polyfills and transformations.