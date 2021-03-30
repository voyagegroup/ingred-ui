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

moment.locale("ja", {
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
});

function renderMonthText(day: moment.Moment) {
  return day.format("YYYY年M月");
}

function displayFormat() {
  return "YYYY/MM/DD";
}

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
        displayFormat={displayFormat}
        customArrowIcon={<Styled.CustomArrowIcon />}
        numberOfMonths={2}
        enableOutsideDays={true}
        daySize={41}
        renderMonthText={renderMonthText}
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
};

export default DateRangePicker;
