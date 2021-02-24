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

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = ({
  startDate,
  endDate,
  error = false,
  ...rest
}) => {
  const [
    focusedInput,
    setFocusedInput,
  ] = React.useState<FocusedInputShape | null>(null);

  return (
    <Styled.Container error={error}>
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
            <Icon name="arrow_left" size="lg" />
          </Styled.NavPrev>
        }
        navNext={
          <Styled.NavNext>
            <Icon name="arrow_right" size="lg" />
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
};

export default DateRangePicker;
