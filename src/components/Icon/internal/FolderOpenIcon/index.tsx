import * as React from "react";
import { IconProps } from "../../Icon";

const FolderOpenIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path className="a" d="M0,0H24V24H0Z" fill="none" />
      <path
        fill={fill}
        className="b"
        d="M3,21a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3h7.414l2,2H20a1,1,0,0,1,1,1V9H4V19l2-8H22.5l-2.31,9.243a1,1,0,0,1-.97.757Z"
      />
    </svg>
  );
};

export { FolderOpenIcon };
