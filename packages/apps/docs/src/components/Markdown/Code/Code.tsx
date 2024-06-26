import type { FC, ReactNode } from 'react';
import React from 'react';
import { code, codeLine, inlineCode } from './style.css';

interface IProp {
  children: ReactNode;
}

export const Code: FC<IProp> = ({ children, ...props }) => {
  if (typeof children === 'string') {
    return <code className={inlineCode}>{children}</code>;
  }

  return (
    <code className={code} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || !child) {
          return null;
        }

        return (
          <span {...props} className={codeLine}>
            <span>{child}</span>
          </span>
        );
      })}
    </code>
  );
};
