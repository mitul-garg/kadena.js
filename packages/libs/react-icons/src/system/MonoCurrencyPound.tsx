import type { SVGProps } from 'react';
import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoCurrencyPound = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="mono"
    viewBox="0 0 24 24"
    fontSize="1.5em"
    fill="currentColor"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14 21c1.93 0 3.62-1.17 4-3l-1.75-.88C16 18.21 15.33 19 14 19H9.1c.83-1 1.5-2.34 1.5-4 0-.35-.03-.69-.08-1H14v-2H9.82C9 10.42 8 9.6 8 8a3.5 3.5 0 0 1 6.78-1.22L16.63 6c-.8-2.05-2.79-3.5-5.13-3.5C8.46 2.5 6 4.96 6 8c0 1.78.79 2.9 1.49 4H6v2h2.47c.08.31.13.64.13 1 0 2.7-2.6 4-2.6 4v2z" />
  </svg>
);
export default MonoCurrencyPound;
