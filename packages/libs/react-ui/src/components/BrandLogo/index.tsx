import { KadenaLogo } from './variants/Kadena';
import { KadenaDevToolsLogo } from './variants/KadenaDevTools';
import { KadenaDocsLogo } from './variants/KadenaDocs';

import React, { FC, SVGProps } from 'react';

export type LogoVariant = 'Kadena' | 'DevTools' | 'Docs';
export const logoVariants: LogoVariant[] = ['Kadena', 'DevTools', 'Docs'];

export interface IBrandLogoProps {
  variant?: LogoVariant;
}

const renderSwitch = (
  logo: LogoVariant = 'Kadena',
): FC<SVGProps<SVGSVGElement>> => {
  switch (logo) {
    case 'Docs':
      return KadenaDocsLogo;
    case 'DevTools':
      return KadenaDevToolsLogo;
    default:
      return KadenaLogo;
  }
};

const BrandLogo: FC<IBrandLogoProps> = ({ variant }) => {
  const LogoComponent = renderSwitch(variant);
  return <LogoComponent />;
};

export default BrandLogo;