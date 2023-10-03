import { breakpoints, sprinkles, vars } from '@kadena/react-ui/theme';

import { style } from '@vanilla-extract/css';

const browseSectionWrapper = style([
  sprinkles({
    marginBottom: '$6',
  }),
  {
    flexBasis: '50%',
    rowGap: vars.sizes.$4,
    '@media': {
      [breakpoints.md]: {
        flexBasis: '33%',
      },
    },
  },
]);

export { browseSectionWrapper };
