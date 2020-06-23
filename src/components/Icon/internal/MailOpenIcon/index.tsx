import * as React from "react";
import { IconProps } from "../../Icon";

const MailOpenIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M2.243,6.854,11.49,1.31a1,1,0,0,1,1.029,0l9.238,5.545A.5.5,0,0,1,22,7.284V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V7.283a.5.5,0,0,1,.243-.429Zm16.1,1.39-6.285,5.439L5.647,8.238,4.353,9.762l7.72,6.555,7.581-6.56L18.346,8.244Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M2.243,6.854,11.49,1.31a1,1,0,0,1,1.029,0l9.238,5.545A.5.5,0,0,1,22,7.284V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V7.283a.5.5,0,0,1,.243-.429ZM4,8.133V19H20V8.132l-8-4.8-8,4.8ZM12.06,13.7l5.3-4.463,1.288,1.53L12.074,16.3l-6.71-5.53L6.636,9.228,12.06,13.7Z"
          />
        </svg>
      );
  }
};

export { MailOpenIcon };
