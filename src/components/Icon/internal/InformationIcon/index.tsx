import * as React from "react";
import { IconProps } from "../../Icon";

const InformationIcon: React.FunctionComponent<IconProps> = ({
  type,
  fill,
}) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <rect fill="none" />
          <path
            d="M16723,12664a10,10,0,1,1,10-10A9.937,9.937,0,0,1,16723,12664Zm-1-11h0v5h2v-5Zm0-4h0v2h2v-2Z"
            transform="translate(-16711 -12642)"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" />
          <path fill={fill} d="M11 7V5H9V7H11Z" transform="translate(2 2)" />
          <path fill={fill} d="M11 14V9H9V14H11Z" transform="translate(2 2)" />
          <path
            fill={fill}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
            transform="translate(2 2)"
          />
        </svg>
      );
  }
};

export { InformationIcon };
