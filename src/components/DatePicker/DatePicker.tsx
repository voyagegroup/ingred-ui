import * as React from "react";
import * as Styled from "./styled";
import "react-dates/initialize";
import moment from "moment";
import {
  RenderMonthProps,
  SingleDatePicker,
  SingleDatePickerShape,
} from "react-dates";
import Icon from "../Icon";
import Spacer from "../Spacer";
import { useLocaleProps } from "../../hooks/useLocaleProps";

function isOutsideRange() {
  return false;
}

export type DatePickerProps = Partial<
  Omit<SingleDatePickerShape, "date" | "onFocusChange">
> &
  // MEMO: Add RenderMonthProps to pass type check.
  RenderMonthProps & {
    date: moment.Moment | null;
    onDateChange: (date: moment.Moment | null) => void;
    error?: boolean;
  };

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "DatePicker" });
    const { date, error = false, ...rest } = props;

    const [focused, setFocused] = React.useState<boolean>(false);
    const onFocusChange = ({ focused }: { focused: boolean }) => {
      setFocused(focused);
    };

    return (
      <Styled.Container ref={ref} error={error}>
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
  },
);

export default DatePicker;
