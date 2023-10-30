'use client';

import { mergeRefs } from '@react-aria/utils';
import clsx from 'classnames';
import type { FC, ReactElement, Ref } from 'react';
import React, { cloneElement, useRef } from 'react';
import type { AriaModalOverlayProps, ModalOverlayAria } from 'react-aria';
import { Overlay, useModalOverlay } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import { underlayClass } from './Modal.css';

export interface IModalProps extends AriaModalOverlayProps {
  className?: string;
  state: OverlayTriggerState;
  children:
    | ReactElement
    | ((
        modalProps: ModalOverlayAria['modalProps'],
        ref: Ref<HTMLDivElement>,
      ) => ReactElement);
}

export const Modal: FC<IModalProps> = ({
  className,
  children,
  state,
  isDismissable = true,
  isKeyboardDismissDisabled,
}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const underlayRef = useRef<HTMLDivElement | null>(null);
  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable,
      isKeyboardDismissDisabled,
    },
    state,
    nodeRef,
  );

  if (!state.isOpen) {
    return null;
  }

  return (
    <Overlay>
      <div
        ref={underlayRef}
        className={clsx(underlayClass, className)}
        {...underlayProps}
      >
        {typeof children === 'function'
          ? children(modalProps, nodeRef)
          : cloneElement(children, {
              ...children.props,
              ...modalProps,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref: mergeRefs(nodeRef, (children as any).ref),
            })}
      </div>
    </Overlay>
  );
};
