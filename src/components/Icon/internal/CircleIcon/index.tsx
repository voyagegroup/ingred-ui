import * as React from "react";
import { IconProps } from "../../Icon";

const CircleIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12 20C16.4182 20 20 16.4182 20 12C20 7.58172 16.4182 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4182 7.58172 20 12 20Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20ZM12 18.4C15.5346 18.4 18.4 15.5346 18.4 12C18.4 8.46538 15.5346 5.6 12 5.6C8.46538 5.6 5.6 8.46538 5.6 12C5.6 15.5346 8.46538 18.4 12 18.4Z"
          />
        </svg>
      );
  }
};

export { CircleIcon };
