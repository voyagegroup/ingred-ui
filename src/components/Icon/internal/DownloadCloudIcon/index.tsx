import * as React from "react";
import { IconProps } from "../../Icon";

const DownloadCloudIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M7,20.981a6.5,6.5,0,0,1-2.936-12,8,8,0,0,1,15.872,0,6.5,6.5,0,0,1-2.936,12V21H7ZM13,12V8H11v4H8l4,5,4-5Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M1,14.5A6.5,6.5,0,0,1,4.064,8.981a8,8,0,0,1,15.872,0,6.5,6.5,0,0,1-2.936,12L7,21A6.531,6.531,0,0,1,1,14.5Zm15.848,4.487a4.5,4.5,0,0,0,2.03-8.309l-.807-.5-.12-.942a6,6,0,0,0-11.9,0l-.12.942-.8.5a4.5,4.5,0,0,0,2.029,8.309L7.325,19h9.35l.173-.013ZM13,12h3l-4,5L8,12h3V8h2Z"
          />
        </svg>
      );
  }
};

export { DownloadCloudIcon };
