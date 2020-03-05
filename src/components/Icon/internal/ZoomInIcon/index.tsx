import * as React from "react";
import { IconProps } from "../../Icon";

const ZoomInIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill={fill}
        d="M18.031,16.617,22.314,20.9,20.9,22.314l-4.282-4.283a9,9,0,1,1,1.414-1.414Zm-2.006-.742a7,7,0,1,0-.15.15l.15-.15ZM10,10V7h2v3h3v2H12v3H10V12H7V10Z"
      />
    </svg>
  );
};

export { ZoomInIcon };
