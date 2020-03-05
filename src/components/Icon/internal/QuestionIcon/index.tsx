import * as React from "react";
import { IconProps } from "../../Icon";

const QuestionIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={fill}
            d="M12,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Zm-1-7v2h2V15Zm2-1.645A3.5,3.5,0,1,0,8.567,9.313l1.962.393A1.5,1.5,0,1,1,12,11.5a1,1,0,0,0-1,1V14h2Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill={fill}
            d="M12,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Zm0-2a8,8,0,1,0-8-8A8,8,0,0,0,12,20Zm-1-5h2v2H11Zm2-1.645V14H11V12.5a1,1,0,0,1,1-1,1.5,1.5,0,1,0-1.471-1.794L8.567,9.313A3.5,3.5,0,1,1,13,13.355Z"
          />
        </svg>
      );
  }
};

export { QuestionIcon };
