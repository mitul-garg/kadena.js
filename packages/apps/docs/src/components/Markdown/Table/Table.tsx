import { type ITableProps, Table as StyledTable } from '@kadena/react-ui';

import { wrapperClass } from '../styles.css';

import React, { type FC } from 'react';

export const Table: FC<ITableProps> = ({ children }) => {
  return (
    <div className={wrapperClass}>
      <StyledTable.Root>{children}</StyledTable.Root>
    </div>
  );
};
