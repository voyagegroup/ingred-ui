import * as React from "react";
import { IconProps } from "../../Icon";

const EyeOffIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0,0H18V18H0Z" fill="none" />
      <path
        fill={fill}
        d="M3.685,4.8,1.34,2.454,2.4,1.393,17.25,16.243,16.189,17.3l-2.483-2.483A8.253,8.253,0,0,1,1.181,9.348,8.237,8.237,0,0,1,3.686,4.8Zm7.678,7.679-1.1-1.1a2.25,2.25,0,0,1-3-3l-1.1-1.1a3.75,3.75,0,0,0,5.2,5.2ZM6.276,3.168A8.258,8.258,0,0,1,17.41,9.348,8.21,8.21,0,0,1,15.9,12.792L13.005,9.9a3.75,3.75,0,0,0-4.26-4.26L6.276,3.169Z"
        transform="translate(-0.295 -0.348)"
      />
    </svg>
  );
};

export { EyeOffIcon };
