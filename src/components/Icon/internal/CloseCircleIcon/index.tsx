import * as React from "react";
import { IconProps } from "../../Icon";

const CloseCircleIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g transform="translate(-657 -463)">
        <path d="M0,0H24V24H0Z" transform="translate(657 463)" fill="none" />
        <g transform="translate(659 465)">
          <rect
            width="17.143"
            height="17.143"
            transform="translate(1.429 1.429)"
            fill="none"
          />
          <circle cx="10" cy="10" r="10" fill={fill} />
          <g transform="translate(2 2)">
            <rect width="16" height="16" fill="none" />
            <rect
              width="3.428"
              height="15.428"
              rx="1.714"
              transform="translate(12.242 1.333) rotate(45)"
              fill="#fff"
            />
            <rect
              width="3.428"
              height="15.428"
              rx="1.714"
              transform="translate(1.333 3.758) rotate(-45)"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export { CloseCircleIcon };
