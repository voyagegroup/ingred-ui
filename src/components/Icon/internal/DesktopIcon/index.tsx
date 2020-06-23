import * as React from "react";
import { IconProps } from "../../Icon";

const DesktopIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0 0h18v18H0z" fill="none" />
          <path
            fill={fill}
            d="M3.4,11.895H14.6V4.368H3.4Zm6.3,1.368v1.368h2.8V16h-7V14.632H8.3V13.263H2.694a.707.707,0,0,1-.494-.2.675.675,0,0,1-.2-.485V3.689A.7.7,0,0,1,2.694,3H15.306A.691.691,0,0,1,16,3.689v8.885a.7.7,0,0,1-.694.689Z"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M13,18v2h4v2H7V20h4V18H2.992A1,1,0,0,1,2,16.993V4.007A1.007,1.007,0,0,1,2.992,3H21.008A1,1,0,0,1,22,4.007V16.993A1.007,1.007,0,0,1,21.008,18Z"
          />
        </svg>
      );
  }
};

export { DesktopIcon };
