import * as React from "react";
import { IconProps } from "../../Icon";

const PencilIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0,0H18V18H0Z" fill="none" />
          <path
            fill={fill}
            d="M12.546,8.022,11.485,6.961,4.5,13.947v1.06H5.561l6.986-6.986Zm1.061-1.061L14.667,5.9,13.607,4.84,12.546,5.9ZM6.181,16.507H3V13.325L13.076,3.249a.75.75,0,0,1,1.06,0l2.122,2.122a.75.75,0,0,1,0,1.061L6.182,16.507Z"
            transform="translate(-0.75 -0.757)"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12.9,6.858,17.142,11.1,7.242,21H3V16.757l9.9-9.9Zm1.414-1.414,2.121-2.122a1,1,0,0,1,1.414,0l2.829,2.829a1,1,0,0,1,0,1.414L18.556,9.686Z"
          />
        </svg>
      );
  }
};

export { PencilIcon };
