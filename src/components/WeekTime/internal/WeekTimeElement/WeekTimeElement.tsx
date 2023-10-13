import * as Styled from "./styled";
import React, { Fragment, useMemo } from "react";
import { getTargetSetting } from "../../utils";
import { timeList } from "./constants";

export type WeekTimeElementProps = {
  weekTime: string;
  weekList: string[];
  WeekTimeItem: React.FC<
    { active: boolean; hover: boolean } & React.HTMLAttributes<
      HTMLButtonElement | HTMLSpanElement
    >
  >;
  isWithinHoverRange?: (weekIndex: number, timeIndex: number) => boolean;
  onMouseOver?: (weekIndex: number, timeIndex: number) => void;
  onMouseDown?: (weekIndex: number, timeIndex: number, time: string) => void;
};

export const WeekTimeElement: React.FC<WeekTimeElementProps> = ({
  weekList,
  weekTime,
  WeekTimeItem,
  isWithinHoverRange,
  onMouseOver,
  onMouseDown,
}) => {
  const weekTimeList = useMemo(() => getTargetSetting(weekTime), [weekTime]);

  const handleMouseOver = (weekIndex: number, timeIndex: number) => () => {
    onMouseOver?.(weekIndex, timeIndex);
  };

  const handleMouseDown =
    (weekIndex: number, timeIndex: number, time: string) => () => {
      onMouseDown?.(weekIndex, timeIndex, time);
    };

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
            <WeekTimeItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${weekIndex}-${timeIndex}`}
              active={t === "1"}
              hover={
                isWithinHoverRange
                  ? isWithinHoverRange(weekIndex, timeIndex)
                  : false
              }
              onMouseOver={handleMouseOver(weekIndex, timeIndex)}
              onMouseDown={handleMouseDown(weekIndex, timeIndex, t)}
            />
          ))}
        </Fragment>
      ))}
    </Styled.WeekTimeContainer>
  );
};
