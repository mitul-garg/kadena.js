import { sizeVariants } from './IconWrapper.css';

import React, { SVGProps } from 'react';

export interface IIconProps {
  size?: keyof typeof sizeVariants;
}

export type IconType = SVGProps<SVGSVGElement> & IIconProps;

export const IconWrapper = (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: React.FC<SVGProps<SVGSVGElement>>,
): React.FC<IconType> => {
  const WrappedIcon: React.FC<SVGProps<SVGSVGElement> & IIconProps> = ({
    size = 'md',
    ...props
  }) => (
    <span className={sizeVariants[size]}>
      <Component {...props} height="100%" width="100%" />
    </span>
  );

  WrappedIcon.displayName = Component.displayName;
  return WrappedIcon;
};
