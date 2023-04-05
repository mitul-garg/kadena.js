import * as React from 'react';
import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={10}
    viewBox="0 0 20 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5C0 6.32608 0.526784 7.59785 1.46447 8.53553C2.40215 9.47322 3.67392 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C16.3261 10 17.5979 9.47322 18.5355 8.53553C19.4732 7.59785 20 6.32608 20 5C20 3.67392 19.4732 2.40215 18.5355 1.46447C17.5979 0.526784 16.3261 0 15 0Z"
      fill="black"
    />
  </svg>
);
export default SVGComponent;
