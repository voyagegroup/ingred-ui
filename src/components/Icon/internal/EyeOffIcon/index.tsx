import * as React from "react";
import { IconProps } from "../../Icon";

const EyeOffIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M17.882,19.3A11,11,0,0,1,1.181,12a10.982,10.982,0,0,1,3.34-6.066L1.392,2.808,2.807,1.393l19.8,19.8-1.415,1.414-3.31-3.31ZM5.935,7.35A8.965,8.965,0,0,0,3.223,12a9,9,0,0,0,13.2,5.838L14.4,15.81A4.5,4.5,0,0,1,8.19,9.6Zm6.979,6.978L9.672,11.086a2.5,2.5,0,0,0,3.241,3.241Zm7.893,2.264-1.431-1.43A8.935,8.935,0,0,0,20.777,12,9.005,9.005,0,0,0,9.552,5.338L7.974,3.76A11.01,11.01,0,0,1,22.819,12a10.947,10.947,0,0,1-2.012,4.592ZM11.723,7.508a4.5,4.5,0,0,1,4.769,4.769l-4.77-4.769Z"
          />
        </svg>
      );

    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0,0H18V18H0Z" fill="none" />
          <path
            fill={fill}
            d="M3.685,4.8,1.34,2.454,2.4,1.393,17.25,16.243,16.189,17.3l-2.483-2.483A8.253,8.253,0,0,1,1.181,9.348,8.237,8.237,0,0,1,3.686,4.8Zm7.678,7.679-1.1-1.1a2.25,2.25,0,0,1-3-3l-1.1-1.1a3.75,3.75,0,0,0,5.2,5.2ZM6.276,3.168A8.258,8.258,0,0,1,17.41,9.348,8.21,8.21,0,0,1,15.9,12.792L13.005,9.9a3.75,3.75,0,0,0-4.26-4.26L6.276,3.169Z"
            transform="translate(-0.295 -0.348)"
          />
        </svg>
      );
  }
};

export { EyeOffIcon };
