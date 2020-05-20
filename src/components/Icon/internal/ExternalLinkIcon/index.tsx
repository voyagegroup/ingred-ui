import * as React from "react";
import { IconProps } from "../../Icon";

const ExternalLinkIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M8.25,3V4.5H4.5V15H15V11.25h1.5v4.5a.75.75,0,0,1-.75.75h-12A.75.75,0,0,1,3,15.75v-12A.75.75,0,0,1,3.75,3ZM13.94,4.5H10.5V3h6V9H15V5.561l-5.25,5.25L8.69,9.75Z"
        transform="translate(-0.75 -0.75)"
      />
    </svg>
  );
};

export { ExternalLinkIcon };
