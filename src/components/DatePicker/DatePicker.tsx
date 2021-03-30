import * as React from "react";
import * as Styled from "./styled";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker, SingleDatePickerShape } from "react-dates";
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

export type DatePickerProps = Partial<
  Omit<SingleDatePickerShape, "date" | "onFocusChange">
> & {
  date: moment.Moment | null;
  onDateChange: (date: moment.Moment | null) => void;
  error?: boolean;
};

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  date,
  error = false,
  ...rest
}) => {
  const [focused, setFocused] = React.useState<boolean | null>(null);
  const onFocusChange = ({ focused }: { focused: boolean | null }) => {
    setFocused(focused);
  };

  return (
    <Styled.Container error={error}>
      <SingleDatePicker
        id="datePicker"
        focused={focused}
        date={date}
        isOutsideRange={isOutsideRange}
        displayFormat={displayFormat}
        numberOfMonths={1}
        enableOutsideDays={true}
        daySize={41}
        renderMonthText={renderMonthText}
        weekDayFormat="ddd"
        hideKeyboardShortcutsPanel={true}
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
        onFocusChange={onFocusChange}
        {...rest}
      />
    </Styled.Container>
  );
};

export default DatePicker;
