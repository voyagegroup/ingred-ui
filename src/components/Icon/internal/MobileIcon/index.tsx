import * as React from "react";
import { IconProps } from "../../Icon";

const MobileIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M6.286,3.4V14.6h6.429V3.4ZM5.643,2h7.714A.673.673,0,0,1,14,2.7V15.3a.673.673,0,0,1-.643.7H5.643A.673.673,0,0,1,5,15.3V2.7A.673.673,0,0,1,5.643,2ZM9.5,12.5a.7.7,0,1,1-.643.7A.673.673,0,0,1,9.5,12.5Z"
        transform="translate(-0.5)"
      />
    </svg>
  )
};

export { MobileIcon };
