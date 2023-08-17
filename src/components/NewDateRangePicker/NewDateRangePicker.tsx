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

export type NewDateRangePickerProps = {
  startDate: Dayjs;
  endDate: Dayjs;
  actions?: Action[];
  onDatesChange: (date: { startDate: Dayjs; endDate: Dayjs }) => void;
};

export const DateRangePicker = forwardRef<
  HTMLDivElement,
  NewDateRangePickerProps
>(function DateRangePicker({ startDate, endDate, actions, onDatesChange }) {
  const [open, setOpen] = useState(false);
  const { context, refs, strategy, x, y } = useFloating({
    placement: "right-start",
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip()],
  });
  const ref = useRef<HTMLDivElement>(null);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const handleClickCalendarIcon = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = (clickState: "start" | "end") => {
    if (clickState === "end") {
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
          onDatesChange={onDatesChange}
          onClickCalendarIcon={handleClickCalendarIcon}
        />
      </div>
      {open && (
        <CalendarRange
          ref={refs.setFloating}
          startDate={startDate}
          endDate={endDate}
          actions={actions}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 100,
          }}
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
