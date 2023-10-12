'use client';

import { NavAccordionContext } from './NavAccordion.context';
import {
  navAccordionListClass,
  navAccordionListItemClass,
} from './NavAccordion.css';
import type { INavAccordionGroupProps } from './NavAccordionGroup';
import { NavAccordionGroup } from './NavAccordionGroup';
import type { INavAccordionLinkProps } from './NavAccordionLink';

import { accordionSectionClass } from '@components/Accordion/Accordion.css';
import { AccordionHeading } from '@components/Accordion/AccordionHeading';
import type { FC, FunctionComponentElement as FCElement } from 'react';
import React, { Children, useContext } from 'react';

export interface INavAccordionSectionProps {
  children?:
    | FCElement<INavAccordionGroupProps>[]
    | FCElement<INavAccordionLinkProps>[]
    | FCElement<INavAccordionGroupProps>
    | FCElement<INavAccordionLinkProps>;
  onClose?: () => void;
  onOpen?: () => void;
  title: string;
}

export const NavAccordionSection: FC<INavAccordionSectionProps> = ({
  children,
  onClose,
  onOpen,
  title,
}) => {
  const { openSections, setOpenSections, linked } =
    useContext(NavAccordionContext);
  const sectionId = title.replace(/\s+/g, '').toLowerCase();
  const isOpen = openSections.includes(sectionId);

  const handleClick = (): void => {
    if (isOpen) {
      setOpenSections(
        linked ? [] : [...openSections.filter((i) => i !== sectionId)],
      );
      onClose?.();
    } else {
      setOpenSections(linked ? [sectionId] : [...openSections, sectionId]);
      onOpen?.();
    }
  };

  return (
    <section className={accordionSectionClass}>
      <AccordionHeading
        title={title}
        isOpen={isOpen}
        icon={'Close'}
        onClick={handleClick}
      />

      {children && isOpen && (
        <ul className={navAccordionListClass}>
          {Children.map(children, (child) => {
            const Element = child.type === NavAccordionGroup ? 'ul' : 'li';
            const className =
              Element === 'ul'
                ? navAccordionListClass
                : navAccordionListItemClass;
            return <Element className={className}>{child}</Element>;
          })}
        </ul>
      )}
    </section>
  );
};
