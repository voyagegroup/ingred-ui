import * as React from "react";
import { IconProps } from "../../Icon";

const LinkIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M14.036,11.914l-1.061-1.061,1.061-1.06A3,3,0,1,0,9.793,5.55L8.732,6.611,7.672,5.55,8.732,4.49A4.5,4.5,0,1,1,15.1,10.853Zm-2.122,2.122L10.853,15.1A4.5,4.5,0,1,1,4.49,8.732L5.55,7.672l1.061,1.06L5.55,9.793a3,3,0,0,0,4.243,4.243l1.06-1.061Zm0-7.425,1.061,1.061-5.3,5.3L6.611,11.914l5.3-5.3Z"
        transform="translate(-0.793 -0.793)"
      />
    </svg>
  );
};

export { LinkIcon };
