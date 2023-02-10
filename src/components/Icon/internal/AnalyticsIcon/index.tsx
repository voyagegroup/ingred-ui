import * as React from "react";
import { IconProps } from "../../Icon";

const AnalyticsIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={fill}
            transform="translate(-16712.004 -12642)"
            d="M16732.031,12663.447a4,4,0,0,1-4.859-6.274,4,4,0,0,1,6.275,4.859l1.5,1.5-1.416,1.416Zm-3.443-4.863a2,2,0,1,0,3.41,1.415,1.994,1.994,0,0,0-2-2A1.992,1.992,0,0,0,16728.588,12658.584ZM16720,12662v-18h6v10h-2v8Zm-7,0v-8h6v8Zm14-8v-5h6v5Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill={fill}
            transform="translate(-16712 -12642.002)"
            d="M16732.031,12663.447a4,4,0,0,1-4.859-6.274,4,4,0,0,1,6.275,4.859l1.5,1.5-1.416,1.416Zm-3.443-4.863a2,2,0,1,0,3.41,1.415,1.994,1.994,0,0,0-2-2A1.992,1.992,0,0,0,16728.588,12658.584ZM16720,12662v-18h6v10h-2v-8h-2v14h2v2Zm-7,0v-8h6v8Zm2-2h2v-4h-2Zm16-6v-3h-2v3h-2v-5h6v5Z"
          />
        </svg>
      );
  }
};

export { AnalyticsIcon };
