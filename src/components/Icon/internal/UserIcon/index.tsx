import * as React from "react";
import { IconProps } from "../../Icon";

const UserIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M12,2A10,10,0,1,1,2,12,10,10,0,0,1,12,2ZM6.023,15.416A7.478,7.478,0,0,0,12.16,19,7.474,7.474,0,0,0,18.3,15.416a9,9,0,0,0-12.273,0ZM12,11A3,3,0,1,0,9,8,3,3,0,0,0,12,11Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M12,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22ZM7.013,18.256a8,8,0,0,0,10.154-.148,7,7,0,0,0-10.154.148Zm-1.4-1.436a9,9,0,0,1,12.906-.186,8,8,0,1,0-12.906.187ZM12,13a4,4,0,1,1,4-4A4,4,0,0,1,12,13Zm0-2a2,2,0,1,0-2-2A2,2,0,0,0,12,11Z"
          />
        </svg>
      );
  }
};

export { UserIcon };
