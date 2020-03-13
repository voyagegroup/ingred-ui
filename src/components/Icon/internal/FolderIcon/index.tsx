import * as React from "react";
import { IconProps } from "../../Icon";

const FolderIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M10.706,4.734h7.178a.852.852,0,0,1,.836.867V17.738a.852.852,0,0,1-.836.867H2.836A.852.852,0,0,1,2,17.738V3.867A.852.852,0,0,1,2.836,3h6.2ZM3.672,6.468v10.4H17.047V6.468Z"
        transform="translate(-2 -3)"
      />
    </svg>
  );
};

export { FolderIcon };
