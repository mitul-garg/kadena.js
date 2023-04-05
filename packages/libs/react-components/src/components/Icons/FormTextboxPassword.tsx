import * as React from 'react';
import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 5H20V15H15V17C15 17.2652 15.1054 17.5196 15.2929 17.7071C15.4804 17.8946 15.7348 18 16 18H18V20H15.5C14.95 20 14 19.55 14 19C14 19.55 13.05 20 12.5 20H10V18H12C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H10V0H12.5C13.05 0 14 0.45 14 1C14 0.45 14.95 0 15.5 0H18V2H16C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V5ZM0 5H11V7H2V13H11V15H0V5ZM18 13V7H15V13H18ZM6.5 10C6.5 9.60218 6.34196 9.22064 6.06066 8.93934C5.77936 8.65804 5.39782 8.5 5 8.5C4.60218 8.5 4.22064 8.65804 3.93934 8.93934C3.65804 9.22064 3.5 9.60218 3.5 10C3.5 10.3978 3.65804 10.7794 3.93934 11.0607C4.22064 11.342 4.60218 11.5 5 11.5C5.39782 11.5 5.77936 11.342 6.06066 11.0607C6.34196 10.7794 6.5 10.3978 6.5 10ZM11 8.89C10.39 8.33 9.44 8.38 8.88 9C8.32 9.6 8.37 10.55 9 11.11C9.55 11.63 10.43 11.63 11 11.11V8.89Z"
      fill="black"
    />
  </svg>
);
export default SVGComponent;
