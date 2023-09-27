import ErrorText from "../ErrorText";
import * as Styled from "./styled";
import React, { Fragment, useEffect, useState } from "react";
import { defaultHoverWeekTime, timeList, weekList } from "./constants";
import { convertTargetSettingToHex, getTargetSetting } from "./utils";

export type WeekTimeSelectorProps = {
  weekTime: string;
  errorText?: string;
  onChange?: (weekTime: string) => void;
};

const WeekTimeSelector: React.FC<WeekTimeSelectorProps> = ({
  weekTime,
  errorText,
  onChange,
}) => {
  const [weekTimeList, setWeekTimeList] = useState(getTargetSetting(weekTime));
  const [hoverWeekTimeList, setHoverWeekTimeList] =
    useState(defaultHoverWeekTime);

  const [startIndex, setStartIndex] = useState<{
    weekIndex: number;
    timeIndex: number;
  }>({ weekIndex: 0, timeIndex: 0 });
  const [endIndex, setEndIndex] = useState<{
    weekIndex: number;
    timeIndex: number;
  }>({ weekIndex: 0, timeIndex: 0 });
  const [selectState, setSelectState] = useState<"none" | "choosing">("none");
  const [toValue, setToValue] = useState<string>("1");

  // 選択範囲内のセルをnewValueに更新する
  const getNewWeekTimeList = (
    startWeekIndex: number,
    startTimeIndex: number,
    endWeekIndex: number,
    endTimeIndex: number,
    newValue: string,
    weekTimeList: string[][],
  ) => {
    const newWeekTimeList = [...weekTimeList];
    const minWeekIndex = Math.min(startWeekIndex, endWeekIndex);
    const maxWeekIndex = Math.max(startWeekIndex, endWeekIndex);
    const minTimeIndex = Math.min(startTimeIndex, endTimeIndex);
    const maxTimeIndex = Math.max(startTimeIndex, endTimeIndex);

    for (let i = minWeekIndex; i <= maxWeekIndex; i++) {
      const weekTime = newWeekTimeList[i];
      const newWeekTime = weekTime.map((t, index) => {
        if (
          i >= minWeekIndex &&
          i <= maxWeekIndex &&
          index >= minTimeIndex &&
          index <= maxTimeIndex
        ) {
          return newValue; // 選択範囲内のセルの場合、newValueに更新
        }
        return t;
      });

      newWeekTimeList[i] = newWeekTime;
    }

    return newWeekTimeList;
  };

  const handleChangeWeekTime = (
    weekIndex: number,
    timeIndex: number,
    newValue: string,
  ) => {
    if (selectState === "choosing") {
      const newWeekTimeList = getNewWeekTimeList(
        startIndex.weekIndex,
        startIndex.timeIndex,
        weekIndex,
        timeIndex,
        newValue,
        [...weekTimeList],
      );

      setWeekTimeList(newWeekTimeList);
      setSelectState("none");

      onChange?.(convertTargetSettingToHex(newWeekTimeList));
      setHoverWeekTimeList(defaultHoverWeekTime);
    } else if (selectState === "none") {
      setStartIndex({ weekIndex, timeIndex });
      setEndIndex({ weekIndex, timeIndex });
      setSelectState("choosing");
    }
  };

  const handleMouseOver = (weekIndex: number, timeIndex: number) => () => {
    if (selectState === "none") {
      return;
    }

    const newWeekTimeList = getNewWeekTimeList(
      startIndex.weekIndex,
      startIndex.timeIndex,
      weekIndex,
      timeIndex,
      "1",
      [...defaultHoverWeekTime],
    );

    setHoverWeekTimeList(newWeekTimeList);
    setEndIndex({ weekIndex, timeIndex });
  };

  const handleMouseDown =
    (weekIndex: number, timeIndex: number, time: string) => () => {
      const newValue = time === "1" ? "0" : "1";
      setToValue(newValue);
      handleChangeWeekTime(weekIndex, timeIndex, newValue);
    };

  // MEMO: button 以外の場所で mouseup したときの挙動を制御する
  const onMouseUp = () => {
    // mousedown の位置が button のときにのみこの条件に到達する想定
    if (selectState === "choosing") {
      handleChangeWeekTime(endIndex.weekIndex, endIndex.timeIndex, toValue);
    }
  };

  useEffect(() => {
    addEventListener("mouseup", onMouseUp);
    return () => {
      removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <Styled.Container>
      <Styled.WeekTimeContainer>
        {timeList.map((time) => (
          <Styled.TimeContainer key={time}>{time}</Styled.TimeContainer>
        ))}
        {weekTimeList.map((time, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <div>{weekList[index]}</div>
            {time.map((t, i) => (
              <Styled.WeekTimeItem
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}-${i}`}
                active={t === "1"}
                hover={
                  hoverWeekTimeList[index] &&
                  hoverWeekTimeList[index][i] === "1"
                }
                onMouseOver={handleMouseOver(index, i)}
                onMouseDown={handleMouseDown(index, i, t)}
              />
            ))}
          </Fragment>
        ))}
      </Styled.WeekTimeContainer>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Styled.Container>
  );
};

export default WeekTimeSelector;
