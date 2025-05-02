import * as React from "react";
import {
  Button,
  ClickAwayListener,
  ButtonProps,
} from "../../../../../src/components";

const ClickAwayListenerSample: React.FC = () => {
  const [color, setColor] = React.useState<ButtonProps["color"]>("primary");
  const handleClick = (place: "inner" | "outer") => () => {
    setColor(place === "inner" ? "primary" : "danger");
  };
  return (
    <ClickAwayListener onClickAway={handleClick("outer")}>
      <div>
        <Button color={color} onClick={handleClick("inner")}>
          Click outer me!!
        </Button>
      </div>
    </ClickAwayListener>
  );
};

export default ClickAwayListenerSample;
