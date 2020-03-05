import * as React from "react";
import { IconProps } from "../../Icon";

const PencilIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
    <path d="M0,0H18V18H0Z" fill="none" />
    <path
      fill={fill}
      d="M12.546,8.022,11.485,6.961,4.5,13.947v1.06H5.561l6.986-6.986Zm1.061-1.061L14.667,5.9,13.607,4.84,12.546,5.9ZM6.181,16.507H3V13.325L13.076,3.249a.75.75,0,0,1,1.06,0l2.122,2.122a.75.75,0,0,1,0,1.061L6.182,16.507Z"
      transform="translate(-0.75 -0.757)"
    />
  </svg>
);

export { PencilIcon };
