import * as React from "react";
import { Flex, DateRangeField, CalendarRange } from "..";
import { forwardRef, useRef, useState } from "react";
import {
  flip,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Dayjs } from "dayjs";
import { Action } from "../Calendar/internal/Actions";
import {
  ClickState,
  ClickStateType,
} from "../Calendar/CalendarRange/constants";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type DateRange = {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type NewDateRangePickerProps = {
  /**
   * 開始日
   * @default dayjs()
   */
  startDate: Dayjs;
  /**
   * 終了日
   * @default dayjs()
   */
  endDate: Dayjs;
  /**
   * エラーメッセージのテキスト
   */
  errorText?: string;
  /**
   * デフォルトで選択されているアクション
   */
  defaultClickAction?: string;
  /**
   * カレンダーの左に表示するアクション
   */
  actions?: Action[];
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
  onDatesChange: (dates: DateRange) => void;
};

/**
 * @memo 次のメジャーリリースで DateRangePicker に変更。現行の DateRangePicker は削除。
 */
export const DateRangePicker = forwardRef<
  HTMLDivElement,
  NewDateRangePickerProps
>(function DateRangePicker(inProps, propRef) {
  const props = useLocaleProps({
    props: inProps,
    name: "NewDateRangePicker",
  });
  const {
    startDate,
    endDate,
    errorText,
    disabled = false,
    monthFormat = "MMM YYYY",
    weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    isOutsideRange = () => false,
    defaultClickAction,
    actions,
    onDatesChange,
  } = props;

  const [open, setOpen] = useState(false);
  const { context, refs, strategy, x, y } = useFloating({
    placement: "right-start",
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip()],
  });
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(propRef, innerRef);

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const handleClickCalendarIcon = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleClose = (clickState: ClickStateType) => {
    if (clickState === ClickState.END) {
      setOpen(false);
    }
  };

  const handleClickCloseButton = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Flex ref={ref}>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ width: "fit-content" }}
      >
        <DateRangeField
          date={{
            startDate,
            endDate,
          }}
          errorText={errorText}
          disabled={disabled}
          onDatesChange={onDatesChange}
          onClickCalendarIcon={handleClickCalendarIcon}
        />
      </div>
      {open && (
        <CalendarRange
          ref={refs.setFloating}
          startDate={startDate}
          endDate={endDate}
          defaultClickAction={defaultClickAction}
          actions={actions}
          monthFormat={monthFormat}
          weekList={weekList}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 100,
            overflow: "hidden",
          }}
          isOutsideRange={isOutsideRange}
          onClose={handleClose}
          onClickCloseButton={handleClickCloseButton}
          onDatesChange={onDatesChange}
          {...getFloatingProps()}
        />
      )}
    </Flex>
  );
});

export default React.memo(DateRangePicker);
