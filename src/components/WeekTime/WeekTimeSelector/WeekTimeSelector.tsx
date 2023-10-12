import * as Styled from "./styled";
import ErrorText from "../../ErrorText";
import React, { useEffect, useMemo, useState } from "react";
import { convertTargetSettingToHex, getNewWeekTimeList } from "./utils";
import { getTargetSetting } from "../utils";
import { useLocaleProps } from "../../../hooks/useLocaleProps";
import Spacer from "../../Spacer";
import { WeekTimeElement } from "../_internal/WeekTimeElement";

export type WeekTimeSelectorProps = {
  weekTime: string;
  errorText?: string;
  onChange?: (weekTime: string) => void;
};

const WeekTimeSelector: React.FC<WeekTimeSelectorProps> = (inProps) => {
  const props = useLocaleProps({
    props: inProps,
    name: "WeekTimeSelector",
  });

  const { weekTime, errorText, onChange } = props;

  const weekTimeList = useMemo(() => getTargetSetting(weekTime), [weekTime]);
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

      setSelectState("none");

      onChange?.(convertTargetSettingToHex(newWeekTimeList));
    } else if (selectState === "none") {
      setStartIndex({ weekIndex, timeIndex });
      setEndIndex({ weekIndex, timeIndex });
      setSelectState("choosing");
    }
  };

  const isWithinHoverRange = (weekIndex: number, timeIndex: number) => {
    if (selectState === "choosing") {
      const minWeekIndex = Math.min(startIndex.weekIndex, endIndex.weekIndex);
      const maxWeekIndex = Math.max(startIndex.weekIndex, endIndex.weekIndex);
      const minTimeIndex = Math.min(startIndex.timeIndex, endIndex.timeIndex);
      const maxTimeIndex = Math.max(startIndex.timeIndex, endIndex.timeIndex);

      return (
        weekIndex >= minWeekIndex &&
        weekIndex <= maxWeekIndex &&
        timeIndex >= minTimeIndex &&
        timeIndex <= maxTimeIndex
      );
    }
    return false;
  };

  const handleMouseOver = (weekIndex: number, timeIndex: number) => () => {
    if (selectState === "none") {
      return;
    }

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
      <WeekTimeElement
        weekTime={weekTime}
        onHover={isWithinHoverRange}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
      />
      {errorText && (
        <Spacer pt={1}>
          <ErrorText>{errorText}</ErrorText>
        </Spacer>
      )}
    </Styled.Container>
  );
};

export default WeekTimeSelector;
