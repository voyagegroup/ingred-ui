import * as React from "react";
import { IconProps } from "../../Icon";

const SearchIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M14.023,12.963l3.212,3.211-1.061,1.061-3.211-3.212a6.751,6.751,0,1,1,1.061-1.06Zm-1.5-.556a5.248,5.248,0,1,0-.112.112l.112-.112Z"
        transform="translate(-0.5 -0.5)"
      />
    </svg>
  );
};

export { SearchIcon };
