import React, { forwardRef, memo, useMemo } from "react";
import { ErrorText, Icon, Spacer } from "../..";
import { useDateField } from "../useDateField";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { Dayjs } from "dayjs";
import { useTheme } from "../../../themes";
import { DateInput } from "../internal";

export type DateFieldProps = {
  /**
   * 日付
   * @default dayjs()
   */
  date: Dayjs;
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
   * 日付が変更されたときに呼ばれる関数
   */
  onDateChange?: (date: Dayjs) => void;
  /**
   * カレンダーアイコンをクリックした時に呼ばれる関数
   */
  onClick: () => void;
};

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  function DateField(
    { errorText, format = "YYYY-MM-DD", disabled = false, onClick, ...rest },
    propRef,
  ) {
    const theme = useTheme();
    const width = useMemo(() => format.length * 10, [format]);
    const { ref: inputRef, ...props } = useDateField({ format, ...rest });
    const ref = useMergeRefs<HTMLInputElement>(propRef, inputRef);

    return (
      <>
        <InputContainer disabled={disabled} error={!!errorText}>
          <DateInput
            ref={ref}
            readOnly
            style={{ border: "none" }}
            error={!!errorText}
            disabled={disabled}
            width={width}
            {...props}
          />
          <CalendarIcon disabled={disabled} onClick={onClick}>
            <Icon
              name="date_range"
              color={
                disabled ? theme.palette.gray.dark : theme.palette.text.primary
              }
            />
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

export default memo(DateField);
