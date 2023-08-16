import React, { forwardRef, memo, useMemo } from "react";
import { Icon, Input } from "../..";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { Dayjs } from "dayjs";
import { useDateField } from "../useDateField";

type Range = {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type DateRangeFieldProps = {
  date: Range;
  format?: string;
  onClickCalendarIcon?: () => void;
  onDatesChange?: (date: Range) => void;
};

const DateRangeField = forwardRef<HTMLInputElement, DateRangeFieldProps>(
  function DateRangeField(
    { format = "YYYY-MM-DD", onClickCalendarIcon, ...rest },
    propRef,
  ) {
    const width = useMemo(() => format.length * 12, [format]);

    const handleChange = (t: "start" | "end") => (date: Dayjs) => {
      const { startDate, endDate } = rest.date;
      if (t === "start") {
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
      onDateChange: handleChange("start"),
    });

    const { ref: endInputRef, ...endProps } = useDateField({
      ...rest,
      format,
      date: rest.date.endDate,
      onDateChange: handleChange("end"),
    });

    const startRef = useMergeRefs<HTMLInputElement>(propRef, startInputRef);
    const endRef = useMergeRefs<HTMLInputElement>(propRef, endInputRef);

    return (
      <InputContainer>
        <>
          <Input
            ref={startRef}
            readOnly
            width={width}
            style={{ border: "none", textAlign: "center" }}
            {...startProps}
          />
          -
          <Input
            ref={endRef}
            readOnly
            width={width}
            style={{ border: "none", textAlign: "center" }}
            {...endProps}
          />
          <CalendarIcon onClick={onClickCalendarIcon}>
            <Icon name="date_range" />
          </CalendarIcon>
        </>
      </InputContainer>
    );
  },
);

export default memo(DateRangeField);
