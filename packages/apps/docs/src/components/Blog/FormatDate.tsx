import { formatDateDistance } from '@/utils/dates';
import React, { type FC } from 'react';

interface IProps {
  date?: string;
  className?: string;
}

export const FormatDate: FC<IProps> = ({ date, className }) => {
  if (date === undefined) return null;
  return (
    <time className={className} dateTime={date}>
      {formatDateDistance(new Date(date))}
    </time>
  );
};
