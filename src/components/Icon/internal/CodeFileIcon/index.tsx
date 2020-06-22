import * as React from "react";
import { IconProps } from "../../Icon";

const CodeFileIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M16,2l5,5V21.008a.993.993,0,0,1-.993.992H3.993A1,1,0,0,1,3,21.008V2.992A.993.993,0,0,1,3.993,2Zm1.657,10L14.12,8.464,12.707,9.88,14.828,12l-2.12,2.121,1.413,1.415ZM6.343,12l3.536,3.536,1.414-1.415L9.172,12l2.12-2.121L9.88,8.464Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M15,4H5V20H19V8H15ZM3,2.992A1,1,0,0,1,4,2H16l5,5V20.993A1,1,0,0,1,20.007,22H3.993A1,1,0,0,1,3,21.008ZM17.657,12l-3.536,3.536-1.414-1.415L14.828,12l-2.12-2.121,1.413-1.415ZM6.343,12,9.88,8.464l1.414,1.415L9.172,12l2.12,2.121L9.879,15.536Z"
          />
        </svg>
      );
  }
};

export { CodeFileIcon };
