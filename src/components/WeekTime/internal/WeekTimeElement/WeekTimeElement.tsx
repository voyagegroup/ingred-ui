import * as Styled from "./styled";
import { useLocaleProps } from "../../../../hooks/useLocaleProps";
import React, { Fragment, useMemo } from "react";
import { getTargetSetting } from "../../utils";
import { timeList } from "../../constants";

export type WeekTimeElementProps = {
  weekTime: string;
  isWithinHoverRange?: (weekIndex: number, timeIndex: number) => boolean;
  onMouseOver?: (weekIndex: number, timeIndex: number) => void;
  onMouseDown?: (weekIndex: number, timeIndex: number, time: string) => void;
};

export const WeekTimeElement: React.FC<WeekTimeElementProps> = (inProps) => {
  const props = useLocaleProps({
    props: inProps,
    name: "WeekTimeElement",
  });
  const { weekList, weekTime, isWithinHoverRange, onMouseOver, onMouseDown } =
    props;
  const weekTimeList = useMemo(() => getTargetSetting(weekTime), [weekTime]);
  const defaultHandler = () => {};

  return (
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
              as={isWithinHoverRange ? "button" : "span"}
              hover={
                isWithinHoverRange
                  ? isWithinHoverRange(weekIndex, timeIndex)
                  : false
              }
              onMouseOver={
                onMouseOver?.(weekIndex, timeIndex) ?? defaultHandler
              }
              onMouseDown={
                onMouseDown?.(weekIndex, timeIndex, t) ?? defaultHandler
              }
            />
          ))}
        </Fragment>
      ))}
    </Styled.WeekTimeContainer>
  );
};
