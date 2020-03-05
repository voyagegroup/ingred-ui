import * as React from "react";
import { IconProps } from "../../Icon";

const ExclamationIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M0,0H19V19H0Z" fill="none" />
      <path
        fill={fill}
        d="M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18Zm-.8-5.6V14h1.6V12.4ZM9.2,6v4.8h1.6V6Z"
        transform="translate(-0.25 -0.75)"
      />
    </svg>
  );
};

export { ExclamationIcon };
