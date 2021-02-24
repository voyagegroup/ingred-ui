import * as React from "react";
import * as Styled from "./styled";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker, SingleDatePickerShape } from "react-dates";
import Icon from "../Icon";

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
        numberOfMonths={1}
        enableOutsideDays={true}
        daySize={41}
        weekDayFormat="ddd"
        hideKeyboardShortcutsPanel={true}
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
        onFocusChange={onFocusChange}
        {...rest}
      />
    </Styled.Container>
  );
};

export default DatePicker;
