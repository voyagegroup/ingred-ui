import * as React from "react";
import * as Styled from "./styled";
import "react-dates/initialize";
import dayjs, { InstanceLocaleDataReturn } from "dayjs";
import moment from "moment";
import {
  dayjsToMoment,
  momentToDayjs,
  convertDayjsLocaleDataToObject,
} from "../../utils/time";
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
  Omit<
    SingleDatePickerShape,
    "date" | "onFocusChange" | "onDateChange" | "renderMonthText"
  >
> &
  // MEMO: Add RenderMonthProps to pass type check.
  Omit<RenderMonthProps, "renderMonthText"> & {
    date: dayjs.Dayjs | null;
    onDateChange: (date: dayjs.Dayjs | null) => void;
    renderMonthText?: ((month: dayjs.Dayjs) => React.ReactNode) | null;
    locale?: string;
    localeData?: InstanceLocaleDataReturn;
    error?: boolean;
  };

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "DatePicker" });
    const {
      date,
      error = false,
      onDateChange,
      renderMonthText: renderMonthTextProps,
      renderMonthElement,
      locale = "en",
      localeData,
      ...rest
    } = props;

    const [focused, setFocused] = React.useState<boolean>(false);
    const onFocusChange = ({ focused }: { focused: boolean }) => {
      setFocused(focused);
    };
    const handleDateChange = (date: moment.Moment | null) => {
      const dayjsize = momentToDayjs(date);
      onDateChange(dayjsize);
    };
    const handleRenderMonthText = (month: moment.Moment) => {
      const dayjsize = momentToDayjs(month);
      if (!renderMonthTextProps || !dayjsize) return;
      return renderMonthTextProps(dayjsize);
    };

    if (localeData) {
      moment.locale(locale, convertDayjsLocaleDataToObject(localeData));
    } else {
      moment.locale(locale);
    }

    return (
      <Styled.Container ref={ref} error={error}>
        <SingleDatePicker
          id="datePicker"
          focused={focused}
          date={dayjsToMoment(date)}
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
          // eslint-disable-next-line react/jsx-handler-names
          renderMonthText={
            renderMonthTextProps ? handleRenderMonthText : renderMonthTextProps
          }
          renderMonthElement={renderMonthElement as never}
          onFocusChange={onFocusChange}
          onDateChange={handleDateChange}
          {...rest}
        />
      </Styled.Container>
    );
  },
);

export default DatePicker;
