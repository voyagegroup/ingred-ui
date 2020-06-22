import * as React from "react";
import { IconProps } from "../../Icon";

const MoreIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect fill="none" rx="4" transform="translate(24) rotate(90)" />
      <path
        fill={fill}
        d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0ZM2,14a2,2,0,1,0,2,2A2.006,2.006,0,0,0,2,14ZM2,7A2,2,0,1,0,4,9,2.006,2.006,0,0,0,2,7Z"
        transform="translate(21 10) rotate(90)"
      />
    </svg>
  );
};

export { MoreIcon };
