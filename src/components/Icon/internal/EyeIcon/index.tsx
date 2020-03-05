import * as React from "react";
import { IconProps } from "../../Icon";

const EyeIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0,0H18V18H0Z" fill="none" />
      <path
        fill={fill}
        d="M1.181,9.75a8.252,8.252,0,0,1,16.229,0,8.252,8.252,0,0,1-16.229,0ZM9.3,13.5a3.75,3.75,0,1,0-3.75-3.75A3.75,3.75,0,0,0,9.3,13.5Zm0-1.5a2.25,2.25,0,1,1,2.25-2.25A2.25,2.25,0,0,1,9.3,12Z"
        transform="translate(-0.295 -0.75)"
      />
    </svg>
  );
};

export { EyeIcon };
