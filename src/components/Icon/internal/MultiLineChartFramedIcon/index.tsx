import * as React from "react";
import { IconProps } from "../../Icon";

const MultiLineChartFramedIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g transform="translate(-106.572 -29.454)">
            <path
              style={{ fill }}
              d="M109.572,32.454h18a1,1,0,0,1,1,1v16a1,1,0,0,1-1,1h-18a1,1,0,0,1-1-1v-16A1,1,0,0,1,109.572,32.454Zm1,2v14h16v-14Z"
            />
            <path
              style={{ fill }}
              d="M120.04,41.5l-3.162-2.893-3.271,2.469-1.024-1.357,4.4-3.32,3.167,2.9,3.394-2.536,1.018,1.361Z"
            />
            <path
              style={{ fill }}
              d="M120.24,46.5l-3.162-2.893-3.271,2.469-1.024-1.357,4.4-3.32,3.167,2.9,3.394-2.536,1.018,1.361Z"
            />
          </g>
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g transform="translate(-106.572 -29.454)" fill="none">
            <path
              style={{ fill }}
              d="M128.807,66.9h-18a1,1,0,0,0-1,1v16a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1v-16A1,1,0,0,0,128.807,66.9Zm-10.69,3.949,3.167,2.9,3.4-2.536,1.017,1.361-4.521,3.379-3.162-2.893-3.271,2.47-1.024-1.358Zm3.258,10.1-3.162-2.893-3.271,2.47-1.024-1.358,4.4-3.32,3.166,2.9,3.395-2.536,1.017,1.361Z"
              transform="translate(-1.234 -34.449)"
            />
          </g>
        </svg>
      );
  }
};

export { MultiLineChartFramedIcon };
