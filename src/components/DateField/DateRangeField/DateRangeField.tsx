import React, { forwardRef, memo, useMemo } from "react";
import { ErrorText, Icon, Input, Spacer, DateRange } from "../..";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { Dayjs } from "dayjs";
import { useDateField } from "../useDateField";
import {
  ClickState,
  ClickStateType,
} from "../../Calendar/CalendarRange/constants";

export type DateRangeFieldProps = {
  /**
   * 日付
   * @default { startDate: dayjs(), endDate: dayjs() }
   */
  date: DateRange;
  /**
   * 指定したい format
   * @default YYYY-MM-DD
   */
  format?: string;
  /**
   * エラーメッセージのテキスト
   */
  errorText?: string;
  /**
   * 入力を無効にする
   * @default false
   */
  disabled?: boolean;
  /**
   * カレンダーアイコンをクリックした時に呼ばれる関数
   */
  onClickCalendarIcon?: () => void;
  /**
   * 日付が変更されたときに呼ばれる関数
   */
  onDatesChange?: (date: DateRange) => void;
};

const DateRangeField = forwardRef<HTMLInputElement, DateRangeFieldProps>(
  function DateRangeField(
    {
      format = "YYYY-MM-DD",
      errorText,
      disabled = false,
      onClickCalendarIcon,
      ...rest
    },
    propRef,
  ) {
    const width = useMemo(() => format.length * 12, [format]);

    const handleChange = (t: ClickStateType) => (date: Dayjs) => {
      const { startDate, endDate } = rest.date;
      if (t === ClickState.START) {
        rest.onDatesChange?.({
          endDate,
          startDate: date,
        });
      } else {
        rest.onDatesChange?.({
          startDate,
          endDate: date,
        });
      }
    };

    const { ref: startInputRef, ...startProps } = useDateField({
      ...rest,
      format,
      date: rest.date.startDate,
      onDateChange: handleChange(ClickState.START),
    });

    const { ref: endInputRef, ...endProps } = useDateField({
      ...rest,
      format,
      date: rest.date.endDate,
      onDateChange: handleChange(ClickState.END),
    });

    const startRef = useMergeRefs<HTMLInputElement>(propRef, startInputRef);
    const endRef = useMergeRefs<HTMLInputElement>(propRef, endInputRef);

    return (
      <>
        <InputContainer error={!!errorText} disabled={disabled}>
          <Input
            ref={startRef}
            readOnly
            disabled={disabled}
            width={width}
            error={!!errorText}
            style={{ border: "none", textAlign: "center" }}
            {...startProps}
          />
          -
          <Input
            ref={endRef}
            readOnly
            disabled={disabled}
            width={width}
            error={!!errorText}
            style={{ border: "none", textAlign: "center" }}
            {...endProps}
          />
          <CalendarIcon onClick={onClickCalendarIcon}>
            <Icon name="date_range" />
          </CalendarIcon>
        </InputContainer>
        {errorText && (
          <Spacer pt={1}>
            <ErrorText>{errorText}</ErrorText>
          </Spacer>
        )}
      </>
    );
  },
);

export default memo(DateRangeField);
