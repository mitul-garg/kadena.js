import type {
  colors
} from './Notification.css';
import {
  cardColorVariants,
  closeButtonClass,
  containerClass,
  contentClass,
  descriptionClass,
  expandVariants
} from './Notification.css';

import { SystemIcon } from '@components/Icon';
import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

export interface INotificationProps {
  icon?: keyof typeof SystemIcon;
  title?: string;
  children?: React.ReactNode;
  expanded?: boolean;
  color?: keyof typeof colors;
  hasCloseButton?: boolean;
  onClose?: () => void;
}

export const NotificationContainer: FC<INotificationProps> = ({
  icon,
  title,
  children,
  hasCloseButton = false,
  color = 'info',
  expanded = false,
  onClose,
}) => {
  const Icon = icon ? SystemIcon[icon] : SystemIcon.HelpCircle;

  const classList = classNames(
    containerClass,
    cardColorVariants[color],
    expandVariants[expanded ? 'true' : 'false'],
  );

  return (
    <div className={classList}>
      <Icon size="md" />

      <div className={contentClass}>
        {title !== undefined && <h4>{title}</h4>}
        <div className={descriptionClass}>{children}</div>
      </div>

      {hasCloseButton && (
        <button
          className={closeButtonClass}
          onClick={onClose}
          aria-label="Close Notification"
        >
          <SystemIcon.Close size="md" />
        </button>
      )}
    </div>
  );
};
