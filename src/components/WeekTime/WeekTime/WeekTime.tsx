import * as Styled from "./styled";
import React, { Fragment, useMemo } from "react";
import { useLocaleProps } from "../../../hooks/useLocaleProps";
import { getTargetSetting } from "../utils";
import { timeList } from "../constants";

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
    const weekTimeList = useMemo(() => getTargetSetting(weekTime), [weekTime]);

    return (
      <Styled.Container ref={ref}>
        <Styled.WeekTimeContainer>
          <Styled.EmptyContainer />
          {timeList.map((time) => (
            <Styled.TimeContainer key={time}>{time}</Styled.TimeContainer>
          ))}
          {weekTimeList.map((time, weekIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={weekIndex}>
              <Styled.WeekContainer>{weekList[weekIndex]}</Styled.WeekContainer>
              {time.map((t, timeIndex) => (
                <Styled.WeekTimeItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${weekIndex}-${timeIndex}`}
                  active={t === "1"}
                />
              ))}
            </Fragment>
          ))}
        </Styled.WeekTimeContainer>
      </Styled.Container>
    );
  },
);

export default WeekTime;
