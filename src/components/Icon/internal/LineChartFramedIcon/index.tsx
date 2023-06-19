import * as React from "react";
import { IconProps } from "../../Icon";

const LineChartFramedIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" />
          <path
            fill={fill}
            d="M16.238 6.77998L15.024 5.56598L11.339 9.24798L8.76304 6.67298L3.86304 11.573L5.07704 12.79L8.76304 9.10498L11.338 11.68L16.238 6.77998Z"
            transform="translate(2 3)"
          />
          <path
            fill={fill}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM2 16V2H18V16H2Z"
            transform="translate(2 3)"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M-4335-778h-18a1,1,0,0,1-1-1v-16a1,1,0,0,1,1-1h18a1,1,0,0,1,1,1v16A1,1,0,0,1-4335-778Zm-10.373-11.324-5.445,4.9,1.349,1.214,4.1-3.686,2.862,2.576,5.444-4.9-1.349-1.214-4.1,3.685Z"
            transform="translate(4356 799)"
          />
        </svg>
      );
  }
};

export { LineChartFramedIcon };
