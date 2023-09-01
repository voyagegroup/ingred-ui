import React, { forwardRef, memo, useCallback, useState } from "react";
import { Flex, Calendar, DateField } from "..";
import { Action } from "../Calendar/internal/Actions";
import { Dayjs } from "dayjs";
import {
  flip,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type NewDatePickerProps = {
  /**
   * 日付
   * @default dayjs()
   */
  date: Dayjs;
  /**
   * カレンダーの左に表示するアクション
   */
  actions?: Action[];
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
   * カレンダーに表示する年月のフォーマット
   */
  monthFormat?: string;
  /**
   * カレンダーに表示する曜日のリスト
   * @memo dayjs().format("ddd") で対応したいが、階層が深くなったりするので一旦静的な値で対処
   */
  weekList?: string[];
  /**
   * 選択可能なカレンダーの領域を制限する
   * true が返る場合は、選択不可となる
   * @default () => false
   */
  isOutsideRange?: (date: Dayjs) => boolean;
  /**
   * 日付が変更されたときに呼ばれる関数
   */
  onDateChange: (date: Dayjs) => void;
};

/**
 * @memo 次のメジャーリリースで DatePicker に変更。現行の DatePicker は削除。
 */
export const NewDatePicker = forwardRef<HTMLDivElement, NewDatePickerProps>(
  function DatePicker(inProps, ref) {
    const props = useLocaleProps({ props: inProps, name: "NewDatePicker" });
    const {
      date,
      format = "YYYY-MM-DD",
      disabled = false,
      monthFormat = "MMM YYYY",
      weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      isOutsideRange,
      errorText,
      actions,
      onDateChange,
    } = props;

    const [open, setOpen] = useState(false);
    const { context, refs, strategy, x, y } = useFloating({
      placement: "right-start",
      open,
      onOpenChange: setOpen,
      middleware: [offset(10), flip()],
    });

    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      dismiss,
      role,
    ]);

    const handleClickCalendarIcon = useCallback(() => {
      if (disabled) return;
      setOpen((prev) => !prev);
    }, [disabled]);

    const handleClickDate = useCallback(
      (date: Dayjs) => {
        onDateChange(date);
        setOpen(false);
      },
      [onDateChange],
    );

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    return (
      <Flex ref={ref} style={{ width: "fit-content" }}>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <DateField
            date={date}
            format={format}
            errorText={errorText}
            disabled={disabled}
            onClick={handleClickCalendarIcon}
            onDateChange={onDateChange}
          />
        </div>
        {open && (
          <Calendar
            ref={refs.setFloating}
            date={date}
            monthFormat={monthFormat}
            weekList={weekList}
            actions={actions}
            isOutsideRange={isOutsideRange}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 100,
              overflow: "hidden",
            }}
            onClickCloseButton={handleClose}
            onDateChange={handleClickDate}
            {...getFloatingProps()}
          />
        )}
      </Flex>
    );
  },
);

export default memo(NewDatePicker);
