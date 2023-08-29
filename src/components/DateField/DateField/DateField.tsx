import React, { forwardRef, memo } from "react";
import { ErrorText, Icon, Input, Spacer } from "../..";
import { useDateField } from "../useDateField";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { Dayjs } from "dayjs";
import { useTheme } from "../../../themes";

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
    { errorText, disabled = false, onClick, ...rest },
    propRef,
  ) {
    const theme = useTheme();
    const { ref: inputRef, ...props } = useDateField({ ...rest });
    const ref = useMergeRefs<HTMLInputElement>(propRef, inputRef);

    return (
      <>
        <InputContainer disabled={disabled} error={!!errorText}>
          <Input
            ref={ref}
            readOnly
            style={{ border: "none" }}
            error={!!errorText}
            disabled={disabled}
            {...props}
          />
          <CalendarIcon onClick={onClick}>
            <Icon name="date_range" color={theme.palette.primary.main} />
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
