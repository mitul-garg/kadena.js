import { wrapperClass } from '../styles.css';

import { BodyText } from '@/components/Typography';
import React, { type FC, type ReactNode } from 'react';

interface IProp {
  children: ReactNode;
}

export const Paragraph: FC<IProp> = ({ children }) => {
  return (
    <div className={wrapperClass}>
      <BodyText as="p">{children}</BodyText>
    </div>
  );
};
