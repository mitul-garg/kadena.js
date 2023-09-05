import { tdClass } from './Table.css';

import type { FC } from 'react';
import React from 'react';

export interface ITdProps {
  children?: React.ReactNode;
}

export const Td: FC<ITdProps> = ({ children }) => {
  return <td className={tdClass}>{children}</td>;
};
