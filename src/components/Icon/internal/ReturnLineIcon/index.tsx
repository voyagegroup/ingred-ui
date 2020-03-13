import * as React from "react";
import { IconProps } from "../../Icon";

const ReturnLineIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M4.871,5.512l1.9,1.9L5.713,8.475,2,4.762,5.713,1.05,6.773,2.111l-1.9,1.9H10.25a6,6,0,1,1,0,12H3.5v-1.5h6.75a4.5,4.5,0,1,0,0-9Z"
        transform="translate(-0.5 0.737)"
      />
    </svg>
  );
};

export { ReturnLineIcon };
