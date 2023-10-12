import * as Styled from "./styled";
import React from "react";
import { WeekTimeElement } from "../internal/WeekTimeElement";

export type WeekTimeProps = {
  weekTime: string;
};

const WeekTime = React.forwardRef<HTMLDivElement, WeekTimeProps>(
  function WeekTime(props, ref) {
    const { weekTime } = props;
  return (
    <Styled.Container>
      <WeekTimeElement weekTime={weekTime} ref={ref} />
    </Styled.Container>
  );
  }
)

export default WeekTime;
