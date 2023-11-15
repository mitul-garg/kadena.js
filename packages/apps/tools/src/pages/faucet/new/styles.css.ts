import { sprinkles } from '@kadena/react-ui/theme';

import { style } from '@vanilla-extract/css';

export const buttonContainerClass = style([
  { display: 'flex', flexDirection: 'row-reverse' },
]);
export const notificationContainerStyle = style([
  sprinkles({ fontSize: '$sm', marginY: '$6' }),
]);
export const notificationLinkStyle = style([
  sprinkles({ color: '$neutral5', fontWeight: '$bold' }),
]);

export const pubKeyInputWrapperStyle = style([
  sprinkles({
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
  }),
  {
    width: '100%',
  },
]);

export const pubKeysContainerStyle = style([
  sprinkles({
    display: 'flex',
    gap: '$2',
    marginY: '$4',
    flexWrap: 'wrap',
  }),
]);

export const inputWrapperStyle = style([
  {
    width: '90%',
  },
]);

export const iconButtonWrapper = style([
  sprinkles({
    width: '$sm',
    position: 'absolute',
    top: '$10',
    right: '$6',
  }),
]);

export const notificationContentStyle = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
  }),
]);

export const hoverTagContainerStyle = style([
  sprinkles({
    marginX: '$1',
  }),
]);
