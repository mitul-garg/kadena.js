# Utils within React UI

In order to make our lives easier we have created a few utilities within UI to
make styling, accessing tokens easier or just reducing boilerplate

## Functions

### token(...)

```ts
token(path: TokenPath, fallback?: string): string
```

This functions helps with accessing the token path making it shorter and allows
you to pass a fallback in case the path is not matching.

The following example shows how the two would look if you wanted to do the same,
but the upside for the token method resides in the possibility of a second
parameter as fallback

```ts
boxShadow: `0px 1px 0 0 ${token('color.border.base.default')}`,
// vs
boxShadow: `0px 1px 0 0 ${tokens.kda.foundation.color.border.base.default}`,
```

### useAsyncFn(...)

```ts
useAsyncFn<T extends AsyncFn>(
  fn: T,
  deps: DependencyList = [],
  initialState: AsyncFnState<T> = { isLoading: false },
): AsyncFnReturn<T>
```

Just reduces the boilerplate when using async functions. Example can be found in
CopyButton.tsx

## Styling utils

### responsiveStyle(...)

We have the following list of breakpoints

```ts
breakpoints = {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
};
```

This functions enables to add specific styles specifiying a breakpoint, its best
illustrated in with an example

The usage is straight forward, but should be outside the atoms

```ts
style([
  atoms(...),
  {
    // maybe some more outside-atoms styles
    ...responsiveStyle({
      xs: {
        flex: '1',
        selectors: {
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      }
      md: {
        flexDirection: 'row',
      },
    }),
  }
]);
```

A few other useful functions that allow us to skip some boilerplate are:

## Animation utils

### useEnterAnimation(...)

```ts
useEnterAnimation(
  ref: RefObject<HTMLElement>,
  isReady: boolean = true,
): boolean
```

This function will help with detecting if the ref is entering an animation.
Example can be found in Popover.tsx

### useExitAnimation(...)

```ts
useExitAnimation(ref: RefObject<HTMLElement>, isOpen: boolean): boolean
```

This function will help with detecting if the ref is exiting an animation.
Example can be found in Popover.tsx
