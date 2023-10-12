import * as Styled from "./styled";
import React from "react";
import { WeekTimeElement } from "../internal/WeekTimeElement";

export type WeekTimeProps = {
  weekTime: string;
};

const WeekTime: React.FC<WeekTimeProps> = (props) => {
  const { weekTime } = props;
  return (
    <Styled.Container>
      <WeekTimeElement weekTime={weekTime} />
    </Styled.Container>
  );
};

export default WeekTime;
