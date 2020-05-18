import * as React from "react";
import { IconProps } from "../../Icon";

const MoreVertIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M11.5,3A1.5,1.5,0,1,0,13,4.5,1.5,1.5,0,0,0,11.5,3Zm0,10.5A1.5,1.5,0,1,0,13,15,1.5,1.5,0,0,0,11.5,13.5Zm0-5.25A1.5,1.5,0,1,0,13,9.75,1.5,1.5,0,0,0,11.5,8.25Z"
        transform="translate(-2.5 -0.75)"
      />
    </svg>
  );
};

export { MoreVertIcon };
