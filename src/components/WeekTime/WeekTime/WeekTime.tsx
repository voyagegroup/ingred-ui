import * as Styled from "./styled";
import React from "react";
import { useLocaleProps } from "../../../hooks/useLocaleProps";
import { WeekTimeElement } from "../internal/WeekTimeElement";

export type WeekTimeProps = {
  weekTime: string;
};

const WeekTime = React.forwardRef<HTMLDivElement, WeekTimeProps>(
  function WeekTime(inProps, ref) {
    const props = useLocaleProps({
      props: inProps,
      name: "WeekTime",
    });
    const { weekList, weekTime } = props;

    return (
      <Styled.Container ref={ref}>
        <WeekTimeElement
          weekTime={weekTime}
          weekList={weekList}
          WeekTimeItem={Styled.WeekTimeItem}
        />
      </Styled.Container>
    );
  },
);

export default WeekTime;
