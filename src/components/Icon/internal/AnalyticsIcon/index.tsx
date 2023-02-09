import * as React from "react";
import { IconProps } from "../../Icon";

const AnalyticsIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath>
        <rect width="13.729" height="20" fill={fill} />
      </clipPath>
    </defs>
    <g clip-path="url(#clip0_510_1173)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 13H8V21H2V13ZM4 15V19H6V15H4Z"
        fill={fill}
      />
      <path d="M16 8H22V13H20V10H18V13H16V8Z" fill={fill} />
      <path d="M15 3V13H13V5H11V19H13V21H9V3H15Z" fill={fill} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.9496 22.5356L22.4456 21.0316C22.9401 20.193 23.1118 19.2028 22.9284 18.2466C22.745 17.2904 22.2192 16.434 21.4496 15.8378C20.6799 15.2416 19.7192 14.9465 18.7475 15.008C17.7759 15.0694 16.86 15.4831 16.1716 16.1716C15.4831 16.86 15.0694 17.7759 15.008 18.7475C14.9465 19.7192 15.2416 20.6799 15.8378 21.4496C16.434 22.2192 17.2904 22.745 18.2466 22.9284C19.2028 23.1118 20.193 22.9401 21.0316 22.4456L22.5356 23.9496L23.9496 22.5356ZM20.4138 20.4138C20.0388 20.7889 19.5301 20.9996 18.9996 20.9996C18.4692 20.9996 17.9605 20.7889 17.5854 20.4138C17.2103 20.0388 16.9996 19.5301 16.9996 18.9996C16.9996 18.4692 17.2103 17.9605 17.5854 17.5854C17.9605 17.2103 18.4692 16.9996 18.9996 16.9996C19.5301 16.9996 20.0388 17.2103 20.4138 17.5854C20.7889 17.9605 20.9996 18.4692 20.9996 18.9996C20.9996 19.5301 20.7889 20.0388 20.4138 20.4138Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_510_1173">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export { AnalyticsIcon };
