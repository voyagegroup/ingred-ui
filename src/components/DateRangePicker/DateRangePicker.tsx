import * as React from "react";
import * as Styled from "./styled";
import "react-dates/initialize";
import moment from "moment";
import {
  FocusedInputShape,
  DateRangePicker as OriginalDateRangePicker,
  DateRangePickerShape,
} from "react-dates";
import Icon from "../Icon";
import Spacer from "../Spacer";
import { useLocaleProps } from "../../hooks/useLocaleProps";

function isOutsideRange() {
  return false;
}

export type DateRangePickerProps = Partial<DateRangePickerShape> & {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  error?: boolean;
};

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "DateRangePicker" });
    const { startDate, endDate, error = false, ...rest } = props;
    const [focusedInput, setFocusedInput] =
      React.useState<FocusedInputShape | null>(null);

    return (
      <Styled.Container ref={ref} error={error}>
        <OriginalDateRangePicker
          startDatePlaceholderText="FROM"
          endDatePlaceholderText="TO"
          isOutsideRange={isOutsideRange}
          customArrowIcon={<Styled.CustomArrowIcon />}
          numberOfMonths={2}
          enableOutsideDays={true}
          daySize={41}
          weekDayFormat="ddd"
          hideKeyboardShortcutsPanel={true}
          startDateId="startDate"
          endDateId="endDate"
          navPrev={
            <Styled.NavPrev>
              <Spacer p={0.5}>
                <Icon name="arrow_left" size="md" />
              </Spacer>
            </Styled.NavPrev>
          }
          navNext={
            <Styled.NavNext>
              <Spacer p={0.5}>
                <Icon name="arrow_right" size="md" />
              </Spacer>
            </Styled.NavNext>
          }
          {...rest}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
        />
      </Styled.Container>
    );
  },
);

export default DateRangePicker;
