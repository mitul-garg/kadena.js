import {
  helperIconColor,
  helperTextColor,
} from './InputHelper/InputHelper.css';

import { inputStatusColor } from '@components/Input/Input.css';
import { sprinkles } from '@theme/sprinkles.css';
import { vars } from '@theme/vars.css';
import { styleVariants } from '@vanilla-extract/css';

export type Status = 'disabled' | 'positive' | 'warning' | 'negative';

const statusOptions: Record<Status, Status> = {
  disabled: 'disabled',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
};

export const statusVariant = styleVariants(statusOptions, (status) => {
  if (status === 'disabled') {
    return [sprinkles({ pointerEvents: 'none' }), { opacity: 0.5 }];
  }

  return {
    vars: {
      [helperIconColor]: vars.colors[`$${status}Accent`],
      [inputStatusColor]: vars.colors[`$${status}Accent`],
      [helperTextColor]: vars.colors[`$${status}Contrast`],
    },
  };
});
