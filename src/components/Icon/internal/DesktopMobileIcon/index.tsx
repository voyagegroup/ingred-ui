import * as React from "react";
import { IconProps } from "../../Icon";

const DesktopMobileIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <defs>
        {/* TODO: もっと良い方法があるので、どうにかしたい */}
        <style>
          {
            `.c{fill:none;}.c{stroke:${fill};stroke-width:1.37px;}.d{stroke:none;}`
          }
        </style>
      </defs>
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M-4867-88h-6.5v-1.368h2.8v-1.368h-5.6a.705.705,0,0,1-.495-.2.68.68,0,0,1-.2-.485v-8.886a.7.7,0,0,1,.7-.689h12.61a.693.693,0,0,1,.7.689V-97h-1.4v-2.632h-11.2V-92.1h8.6v1.368h-2.3v1.368h2.3V-88Z"
        transform="translate(4878 104)"
      />
      <g className="c" transform="translate(10 6)">
        <rect className="d" width="7" height="10" rx="1"/>
        <rect className="a" x="0.685" y="0.685" width="5.63" height="8.63" rx="0.315"/>
      </g>
      <circle className="b" cx="0.5" cy="0.5" r="0.5" transform="translate(13 13)"/>
    </svg>
  )
};

export { DesktopMobileIcon };
