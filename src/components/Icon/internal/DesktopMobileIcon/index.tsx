import * as React from "react";
import { IconProps } from "../../Icon";

const DesktopMobileIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0 0h18v18H0z" fill="none" />
          <path
            fill={fill}
            d="M-4867-88h-6.5v-1.368h2.8v-1.368h-5.6a.705.705,0,0,1-.495-.2.68.68,0,0,1-.2-.485v-8.886a.7.7,0,0,1,.7-.689h12.61a.693.693,0,0,1,.7.689V-97h-1.4v-2.632h-11.2V-92.1h8.6v1.368h-2.3v1.368h2.3V-88Z"
            transform="translate(4878 104)"
          />
          <g
            transform="translate(10 6)"
            style={{ fill: "none", stroke: fill, strokeWidth: "1.37px" }}
          >
            <rect width="7" height="10" rx="1" style={{ stroke: "none" }} />
            <rect x="0.685" y="0.685" width="5.63" height="8.63" rx="0.315" />
          </g>
          <circle cx="0.5" cy="0.5" r="0.5" transform="translate(13 13)" />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g transform="translate(1.453 4)">
            <path
              fill={fill}
              d="M10.595,17.306H4.555V15.484H8.2V13.662H.9a.911.911,0,0,1-.642-.27A.919.919,0,0,1,0,12.745V.918A.923.923,0,0,1,.9,0h16.41a.912.912,0,0,1,.9.918V3h-6.67a1,1,0,0,0-1,1v9.662H10.02v1.822h.527V17a1,1,0,0,0,.047.3Z"
            />
            <path
              fill={fill}
              d="M5.658,2h7.894a.658.658,0,0,1,.658.658V14.5a.658.658,0,0,1-.658.658H5.658A.658.658,0,0,1,5,14.5V2.658A.658.658,0,0,1,5.658,2ZM9.6,11.867a.658.658,0,1,0,.658.658A.658.658,0,0,0,9.6,11.867Z"
              transform="translate(7.009 2.15)"
            />
          </g>
        </svg>
      );
  }
};

export { DesktopMobileIcon };
