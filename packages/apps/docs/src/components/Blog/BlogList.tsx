import { bloglist } from './styles.css';

import type { FC, ReactNode } from 'react';
import React from 'react';

interface IProps {
  children?: ReactNode;
}

export const BlogList: FC<IProps> = ({ children }) => {
  return (
    <section>
      <ul className={bloglist}>{children}</ul>
    </section>
  );
};
