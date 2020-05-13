import * as React from "react";
import { IconProps } from "../../Icon";

const TrashIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M13.25,5H17V6.5H15.5v9.75a.75.75,0,0,1-.75.75H4.25a.75.75,0,0,1-.75-.75V6.5H2V5H5.75V2.75A.75.75,0,0,1,6.5,2h6a.75.75,0,0,1,.75.75ZM14,6.5H5v9h9ZM7.25,8.75h1.5v4.5H7.25Zm3,0h1.5v4.5h-1.5Zm-3-5.25V5h4.5V3.5Z"
        transform="translate(-0.5 -0.5)"
      />
    </svg>
  )
};

export { TrashIcon };
