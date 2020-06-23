import * as React from "react";
import { IconProps } from "../../Icon";

const AuctionIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M14,20v2H2V20ZM14.586.686l7.778,7.778L20.95,9.88l-1.06-.354L17.413,12l5.657,5.657-1.414,1.414L16,13.414l-2.4,2.4.283,1.132-1.415,1.414L4.686,10.586,6.1,9.172l1.13.282,6.294-6.293L13.172,2.1Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M14,20v2H2V20ZM14.586.686l7.778,7.778L20.95,9.88l-1.06-.354L17.413,12l5.657,5.657-1.414,1.414L16,13.414l-2.4,2.4.283,1.132-1.415,1.414L4.686,10.586,6.1,9.172l1.13.282,6.294-6.293L13.172,2.1Zm.707,3.536-7.071,7.07,3.535,3.536,7.071-7.07L15.293,4.222Z"
          />
        </svg>
      );
  }
};

export { AuctionIcon };
