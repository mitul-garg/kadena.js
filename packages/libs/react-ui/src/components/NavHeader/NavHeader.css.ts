import { sprinkles, vars } from '../../styles';

import { style } from '@vanilla-extract/css';

export const containerClass = style([
  sprinkles({
    alignItems: 'stretch',
    backgroundColor: '$gray90',
    color: '$gray40',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '$16',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  }),
  {
    selectors: {
      '&:hover': {
        textDecoration: 'none',
      },
      '&:active': {
        color: vars.colors.$negativeContrast,
      },
    },
  },
]);

export const logoClass = style([
  sprinkles({
    display: 'flex',
    marginLeft: '$3',
  }),
  {
    alignSelf: 'center',
    zIndex: 1,
  },
]);

export const navWrapperClass = style([
  sprinkles({
    alignItems: 'stretch',
    display: 'flex',
    justifyContent: 'center',
  }),
]);

export const navListClass = style([
  sprinkles({
    alignItems: 'stretch',
    display: 'flex',
    justifyContent: 'center',
  }),
  {
    alignSelf: 'center',
    listStyle: 'none',
    zIndex: 1,
  },
]);

export const linkClass = style([
  sprinkles({
    alignItems: 'center',
    borderRadius: '$sm',
    color: '$gray40',
    display: 'flex',
    fontSize: '$sm',
    fontWeight: '$semiBold',
    marginRight: '$6',
    marginX: '$1',
    textDecoration: 'none',
  }),
  {
    alignSelf: 'center',
    padding: `${vars.sizes.$1} ${vars.sizes.$2}`,
    transition: 'background 0.1s ease, color 0.1s ease',
  },
  {
    selectors: {
      '&:active': {
        color: vars.colors.$gray90,
        textDecoration: 'none',
      },
      '&:hover': {
        color: vars.colors.$white,
        textDecoration: 'none',
      },
      '&:focus-visible': {
        color: vars.colors.$blue40,
        textDecoration: 'none',
      },
    },
  },
]);

export const activeLinkClass = style([
  sprinkles({
    backgroundColor: '$white',
    color: '$gray90',
  }),
  {
    selectors: {
      '&:hover': {
        color: vars.colors.$gray90,
        textDecoration: 'none',
      },
    },
  },
]);

export const childrenClass = style([
  sprinkles({
    display: 'flex',
    marginLeft: 'auto',
    marginRight: '$3',
  }),
  {
    alignSelf: 'center',
  },
]);

export const glowClass = style([
  {
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transition: 'all 0.3s ease',
    zIndex: 0,
  },
]);
