import { useTheme } from '@/hooks';
import React, { type FC } from 'react';

interface IProps {
  overwriteTheme?: 'light' | 'dark';
}

export const DocsLogo: FC<IProps> = ({ overwriteTheme }) => {
  const { theme } = useTheme() ?? 'dark';

  if (overwriteTheme === 'dark' || (!overwriteTheme && theme === 'dark')) {
    return (
      <svg
        width="107"
        height="44"
        viewBox="0 0 107 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.7074 7.29248H26.0807L15.9275 17.9471V26.8245L34.7074 7.29248Z"
          fill="url(#paint0_linear_673_240)"
        />
        <path
          d="M15.9275 36.7075H8.63501V7.29248H15.9275V36.7075Z"
          fill="#F0F0F0"
        />
        <path
          d="M35.365 36.7076L23.3817 19.0725L18.5015 24.1449L26.897 36.7076H35.365Z"
          fill="url(#paint1_linear_673_240)"
        />
        <path
          d="M41.2319 17.7322C40.8803 17.7322 40.5785 17.608 40.3263 17.3594C40.0778 17.1108 39.9535 16.8089 39.9535 16.4538C39.9535 16.1058 40.0778 15.8075 40.3263 15.5589C40.5785 15.3104 40.8803 15.1861 41.2319 15.1861C41.5728 15.1861 41.8711 15.3104 42.1268 15.5589C42.3825 15.8075 42.5103 16.1058 42.5103 16.4538C42.5103 16.6882 42.4499 16.9031 42.3292 17.0984C42.212 17.2901 42.0575 17.4446 41.8658 17.5618C41.674 17.6754 41.4627 17.7322 41.2319 17.7322ZM41.2319 12.3789C40.8803 12.3789 40.5785 12.2546 40.3263 12.006C40.0778 11.7575 39.9535 11.4556 39.9535 11.1005C39.9535 10.7525 40.0778 10.456 40.3263 10.2109C40.5785 9.96236 40.8803 9.83807 41.2319 9.83807C41.5728 9.83807 41.8711 9.96236 42.1268 10.2109C42.3825 10.456 42.5103 10.7525 42.5103 11.1005C42.5103 11.3384 42.4499 11.555 42.3292 11.7504C42.212 11.9421 42.0575 12.0948 41.8658 12.2085C41.674 12.3221 41.4627 12.3789 41.2319 12.3789ZM51.7548 19H47.8876V8.09091H51.7868C52.8841 8.09091 53.8287 8.3093 54.6206 8.74609C55.4125 9.17933 56.0215 9.80256 56.4476 10.6158C56.8773 11.429 57.0922 12.402 57.0922 13.5348C57.0922 14.6712 56.8773 15.6477 56.4476 16.4645C56.0215 17.2812 55.4089 17.908 54.6099 18.3448C53.8145 18.7816 52.8627 19 51.7548 19ZM50.1941 17.0238H51.6589C52.3407 17.0238 52.9142 16.9031 53.3794 16.6616C53.8482 16.4165 54.1998 16.0384 54.4341 15.527C54.6721 15.0121 54.791 14.348 54.791 13.5348C54.791 12.7287 54.6721 12.07 54.4341 11.5586C54.1998 11.0472 53.85 10.6708 53.3848 10.4293C52.9196 10.1879 52.3461 10.0671 51.6642 10.0671H50.1941V17.0238ZM62.4548 19.1598C61.6274 19.1598 60.9118 18.984 60.3081 18.6325C59.708 18.2773 59.2446 17.7837 58.9179 17.1516C58.5912 16.516 58.4278 15.7791 58.4278 14.9411C58.4278 14.0959 58.5912 13.3572 58.9179 12.7251C59.2446 12.0895 59.708 11.5959 60.3081 11.2443C60.9118 10.8892 61.6274 10.7116 62.4548 10.7116C63.2822 10.7116 63.996 10.8892 64.5961 11.2443C65.1998 11.5959 65.665 12.0895 65.9917 12.7251C66.3184 13.3572 66.4818 14.0959 66.4818 14.9411C66.4818 15.7791 66.3184 16.516 65.9917 17.1516C65.665 17.7837 65.1998 18.2773 64.5961 18.6325C63.996 18.984 63.2822 19.1598 62.4548 19.1598ZM62.4655 17.402C62.8419 17.402 63.1562 17.2955 63.4083 17.0824C63.6604 16.8658 63.8504 16.571 63.9782 16.1982C64.1096 15.8253 64.1753 15.4009 64.1753 14.9251C64.1753 14.4492 64.1096 14.0249 63.9782 13.652C63.8504 13.2791 63.6604 12.9844 63.4083 12.7678C63.1562 12.5511 62.8419 12.4428 62.4655 12.4428C62.0855 12.4428 61.7659 12.5511 61.5067 12.7678C61.251 12.9844 61.0574 13.2791 60.926 13.652C60.7982 14.0249 60.7343 14.4492 60.7343 14.9251C60.7343 15.4009 60.7982 15.8253 60.926 16.1982C61.0574 16.571 61.251 16.8658 61.5067 17.0824C61.7659 17.2955 62.0855 17.402 62.4655 17.402ZM71.654 19.1598C70.816 19.1598 70.0951 18.9822 69.4914 18.6271C68.8912 18.2685 68.4296 17.7713 68.1064 17.1357C67.7868 16.5 67.627 15.7685 67.627 14.9411C67.627 14.103 67.7886 13.3679 68.1118 12.7358C68.4385 12.1001 68.9019 11.6048 69.502 11.2496C70.1022 10.891 70.816 10.7116 71.6434 10.7116C72.3572 10.7116 72.9822 10.8413 73.5184 11.1005C74.0546 11.3597 74.479 11.7237 74.7915 12.1925C75.104 12.6612 75.2762 13.2116 75.3081 13.8438H73.1668C73.1064 13.4354 72.9466 13.1069 72.6874 12.8583C72.4317 12.6062 72.0961 12.4801 71.6807 12.4801C71.3291 12.4801 71.0219 12.576 70.7591 12.7678C70.4999 12.956 70.2975 13.2312 70.1519 13.5934C70.0063 13.9556 69.9335 14.3942 69.9335 14.9091C69.9335 15.4311 70.0045 15.875 70.1466 16.2408C70.2922 16.6065 70.4964 16.8853 70.7591 17.0771C71.0219 17.2688 71.3291 17.3647 71.6807 17.3647C71.9399 17.3647 72.1725 17.3114 72.3785 17.2049C72.588 17.0984 72.7602 16.9439 72.8952 16.7415C73.0336 16.5355 73.1242 16.2887 73.1668 16.0011H75.3081C75.2726 16.6261 75.1022 17.1765 74.7968 17.6523C74.4949 18.1246 74.0777 18.494 73.545 18.7603C73.0123 19.0266 72.382 19.1598 71.654 19.1598ZM83.5685 13.1513L81.4911 13.2791C81.4556 13.1016 81.3793 12.9418 81.2621 12.7997C81.1449 12.6541 80.9904 12.5387 80.7987 12.4535C80.6104 12.3647 80.3849 12.3203 80.1222 12.3203C79.7706 12.3203 79.4741 12.3949 79.2326 12.544C78.9911 12.6896 78.8704 12.8849 78.8704 13.13C78.8704 13.3253 78.9485 13.4904 79.1048 13.6254C79.261 13.7603 79.5291 13.8686 79.9091 13.9503L81.3899 14.2486C82.1854 14.4119 82.7784 14.6747 83.169 15.0369C83.5597 15.3991 83.755 15.875 83.755 16.4645C83.755 17.0007 83.5969 17.4712 83.2809 17.8761C82.9684 18.2809 82.5387 18.5969 81.9918 18.8242C81.4485 19.0479 80.8217 19.1598 80.1115 19.1598C79.0284 19.1598 78.1655 18.9343 77.5227 18.4833C76.8835 18.0288 76.5089 17.4109 76.3988 16.6296L78.6307 16.5124C78.6982 16.8427 78.8615 17.0948 79.1207 17.2688C79.38 17.4393 79.712 17.5245 80.1168 17.5245C80.5146 17.5245 80.8342 17.4482 81.0756 17.2955C81.3207 17.1392 81.445 16.9386 81.4485 16.6935C81.445 16.4876 81.358 16.3189 81.1875 16.1875C81.017 16.0526 80.7543 15.9496 80.3991 15.8786L78.9822 15.5962C78.1832 15.4364 77.5884 15.1594 77.1978 14.7653C76.8107 14.3711 76.6172 13.8686 76.6172 13.2578C76.6172 12.7322 76.7592 12.2795 77.0433 11.8995C77.331 11.5195 77.734 11.2266 78.2525 11.0206C78.7745 10.8146 79.3853 10.7116 80.0849 10.7116C81.1183 10.7116 81.9315 10.93 82.5245 11.3668C83.1211 11.8036 83.4691 12.3984 83.5685 13.1513Z"
          fill="#F0F0F0"
        />
        <defs>
          <linearGradient
            id="paint0_linear_673_240"
            x1="15.9275"
            y1="17.0585"
            x2="34.7074"
            y2="17.0585"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.6" stopColor="white" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_673_240"
            x1="18.5626"
            y1="28.1876"
            x2="32.3371"
            y2="32.5628"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.6" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="107"
      height="44"
      viewBox="0 0 107 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.7077 7.29248H26.0809L15.9277 17.9471V26.8245L34.7077 7.29248Z"
        fill="url(#paint0_linear_818_4704)"
      />
      <path
        d="M15.9277 36.7075H8.63525V7.29248H15.9277V36.7075Z"
        fill="#191C1D"
      />
      <path
        d="M35.365 36.7076L23.3817 19.0725L18.5015 24.1449L26.897 36.7076H35.365Z"
        fill="url(#paint1_linear_818_4704)"
      />
      <path
        d="M41.2319 17.7322C40.8803 17.7322 40.5785 17.608 40.3263 17.3594C40.0778 17.1108 39.9535 16.8089 39.9535 16.4538C39.9535 16.1058 40.0778 15.8075 40.3263 15.5589C40.5785 15.3104 40.8803 15.1861 41.2319 15.1861C41.5728 15.1861 41.8711 15.3104 42.1268 15.5589C42.3825 15.8075 42.5103 16.1058 42.5103 16.4538C42.5103 16.6882 42.4499 16.9031 42.3292 17.0984C42.212 17.2901 42.0575 17.4446 41.8658 17.5618C41.674 17.6754 41.4627 17.7322 41.2319 17.7322ZM41.2319 12.3789C40.8803 12.3789 40.5785 12.2546 40.3263 12.006C40.0778 11.7575 39.9535 11.4556 39.9535 11.1005C39.9535 10.7525 40.0778 10.456 40.3263 10.2109C40.5785 9.96236 40.8803 9.83807 41.2319 9.83807C41.5728 9.83807 41.8711 9.96236 42.1268 10.2109C42.3825 10.456 42.5103 10.7525 42.5103 11.1005C42.5103 11.3384 42.4499 11.555 42.3292 11.7504C42.212 11.9421 42.0575 12.0948 41.8658 12.2085C41.674 12.3221 41.4627 12.3789 41.2319 12.3789ZM51.7548 19H47.8876V8.09091H51.7868C52.8841 8.09091 53.8287 8.3093 54.6206 8.74609C55.4125 9.17933 56.0215 9.80256 56.4476 10.6158C56.8773 11.429 57.0922 12.402 57.0922 13.5348C57.0922 14.6712 56.8773 15.6477 56.4476 16.4645C56.0215 17.2812 55.4089 17.908 54.6099 18.3448C53.8145 18.7816 52.8627 19 51.7548 19ZM50.1941 17.0238H51.6589C52.3407 17.0238 52.9142 16.9031 53.3794 16.6616C53.8482 16.4165 54.1998 16.0384 54.4341 15.527C54.6721 15.0121 54.791 14.348 54.791 13.5348C54.791 12.7287 54.6721 12.07 54.4341 11.5586C54.1998 11.0472 53.85 10.6708 53.3848 10.4293C52.9196 10.1879 52.3461 10.0671 51.6642 10.0671H50.1941V17.0238ZM62.4548 19.1598C61.6274 19.1598 60.9118 18.984 60.3081 18.6325C59.708 18.2773 59.2446 17.7837 58.9179 17.1516C58.5912 16.516 58.4278 15.7791 58.4278 14.9411C58.4278 14.0959 58.5912 13.3572 58.9179 12.7251C59.2446 12.0895 59.708 11.5959 60.3081 11.2443C60.9118 10.8892 61.6274 10.7116 62.4548 10.7116C63.2822 10.7116 63.996 10.8892 64.5961 11.2443C65.1998 11.5959 65.665 12.0895 65.9917 12.7251C66.3184 13.3572 66.4818 14.0959 66.4818 14.9411C66.4818 15.7791 66.3184 16.516 65.9917 17.1516C65.665 17.7837 65.1998 18.2773 64.5961 18.6325C63.996 18.984 63.2822 19.1598 62.4548 19.1598ZM62.4655 17.402C62.8419 17.402 63.1562 17.2955 63.4083 17.0824C63.6604 16.8658 63.8504 16.571 63.9782 16.1982C64.1096 15.8253 64.1753 15.4009 64.1753 14.9251C64.1753 14.4492 64.1096 14.0249 63.9782 13.652C63.8504 13.2791 63.6604 12.9844 63.4083 12.7678C63.1562 12.5511 62.8419 12.4428 62.4655 12.4428C62.0855 12.4428 61.7659 12.5511 61.5067 12.7678C61.251 12.9844 61.0574 13.2791 60.926 13.652C60.7982 14.0249 60.7343 14.4492 60.7343 14.9251C60.7343 15.4009 60.7982 15.8253 60.926 16.1982C61.0574 16.571 61.251 16.8658 61.5067 17.0824C61.7659 17.2955 62.0855 17.402 62.4655 17.402ZM71.654 19.1598C70.816 19.1598 70.0951 18.9822 69.4914 18.6271C68.8912 18.2685 68.4296 17.7713 68.1064 17.1357C67.7868 16.5 67.627 15.7685 67.627 14.9411C67.627 14.103 67.7886 13.3679 68.1118 12.7358C68.4385 12.1001 68.9019 11.6048 69.502 11.2496C70.1022 10.891 70.816 10.7116 71.6434 10.7116C72.3572 10.7116 72.9822 10.8413 73.5184 11.1005C74.0546 11.3597 74.479 11.7237 74.7915 12.1925C75.104 12.6612 75.2762 13.2116 75.3081 13.8438H73.1668C73.1064 13.4354 72.9466 13.1069 72.6874 12.8583C72.4317 12.6062 72.0961 12.4801 71.6807 12.4801C71.3291 12.4801 71.0219 12.576 70.7591 12.7678C70.4999 12.956 70.2975 13.2312 70.1519 13.5934C70.0063 13.9556 69.9335 14.3942 69.9335 14.9091C69.9335 15.4311 70.0045 15.875 70.1466 16.2408C70.2922 16.6065 70.4964 16.8853 70.7591 17.0771C71.0219 17.2688 71.3291 17.3647 71.6807 17.3647C71.9399 17.3647 72.1725 17.3114 72.3785 17.2049C72.588 17.0984 72.7602 16.9439 72.8952 16.7415C73.0336 16.5355 73.1242 16.2887 73.1668 16.0011H75.3081C75.2726 16.6261 75.1022 17.1765 74.7968 17.6523C74.4949 18.1246 74.0777 18.494 73.545 18.7603C73.0123 19.0266 72.382 19.1598 71.654 19.1598ZM83.5685 13.1513L81.4911 13.2791C81.4556 13.1016 81.3793 12.9418 81.2621 12.7997C81.1449 12.6541 80.9904 12.5387 80.7987 12.4535C80.6104 12.3647 80.3849 12.3203 80.1222 12.3203C79.7706 12.3203 79.4741 12.3949 79.2326 12.544C78.9911 12.6896 78.8704 12.8849 78.8704 13.13C78.8704 13.3253 78.9485 13.4904 79.1048 13.6254C79.261 13.7603 79.5291 13.8686 79.9091 13.9503L81.3899 14.2486C82.1854 14.4119 82.7784 14.6747 83.169 15.0369C83.5597 15.3991 83.755 15.875 83.755 16.4645C83.755 17.0007 83.5969 17.4712 83.2809 17.8761C82.9684 18.2809 82.5387 18.5969 81.9918 18.8242C81.4485 19.0479 80.8217 19.1598 80.1115 19.1598C79.0284 19.1598 78.1655 18.9343 77.5227 18.4833C76.8835 18.0288 76.5089 17.4109 76.3988 16.6296L78.6307 16.5124C78.6982 16.8427 78.8615 17.0948 79.1207 17.2688C79.38 17.4393 79.712 17.5245 80.1168 17.5245C80.5146 17.5245 80.8342 17.4482 81.0756 17.2955C81.3207 17.1392 81.445 16.9386 81.4485 16.6935C81.445 16.4876 81.358 16.3189 81.1875 16.1875C81.017 16.0526 80.7543 15.9496 80.3991 15.8786L78.9822 15.5962C78.1832 15.4364 77.5884 15.1594 77.1978 14.7653C76.8107 14.3711 76.6172 13.8686 76.6172 13.2578C76.6172 12.7322 76.7592 12.2795 77.0433 11.8995C77.331 11.5195 77.734 11.2266 78.2525 11.0206C78.7745 10.8146 79.3853 10.7116 80.0849 10.7116C81.1183 10.7116 81.9315 10.93 82.5245 11.3668C83.1211 11.8036 83.4691 12.3984 83.5685 13.1513Z"
        fill="#191C1D"
      />
      <defs>
        <linearGradient
          id="paint0_linear_818_4704"
          x1="15.9277"
          y1="17.0585"
          x2="34.7077"
          y2="17.0585"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0" />
          <stop offset="0.6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_818_4704"
          x1="18.5626"
          y1="28.1876"
          x2="32.3371"
          y2="32.5628"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#050505" stopOpacity="0" />
          <stop offset="0.6" stopColor="#050505" />
        </linearGradient>
      </defs>
    </svg>
  );
};
