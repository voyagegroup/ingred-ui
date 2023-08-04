import "react-dates/initialize";
import dayjs, { InstanceLocaleDataReturn } from "dayjs";
import moment from "moment";
import * as React from "react";
import {
  FocusedInputShape,
  DateRangePicker as OriginalDateRangePicker,
  DateRangePickerShape,
} from "react-dates";
import { useLocaleProps } from "../../hooks/useLocaleProps";
import {
  dayjsToMoment,
  momentToDayjs,
  convertDayjsLocaleDataToObject,
} from "../../utils/time";
import Icon from "../Icon";
import Spacer from "../Spacer";
import * as Styled from "./styled";

function isOutsideRange() {
  return false;
}

export type DateRangePickerProps = Partial<
  Omit<
    DateRangePickerShape,
    "startDate" | "endDate" | "onDatesChange" | "renderMonthText"
  >
> & {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onDatesChange: (arg: {
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
  }) => void;
  renderMonthText?: ((month: dayjs.Dayjs) => React.ReactNode) | null;
  locale?: string;
  localeData?: InstanceLocaleDataReturn;
  error?: boolean;
};

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "DateRangePicker" });
    const {
      startDate,
      endDate,
      error = false,
      onDatesChange,
      renderMonthText,
      renderMonthElement,
      locale = "en",
      localeData,
      ...rest
    } = props;
    const [focusedInput, setFocusedInput] =
      React.useState<FocusedInputShape | null>(null);

    const handleDatesChange = (arg: {
      startDate: moment.Moment | null;
      endDate: moment.Moment | null;
    }) => {
      const dayjsize = {
        startDate: momentToDayjs(arg.startDate),
        endDate: momentToDayjs(arg.endDate),
      };
      onDatesChange(dayjsize);
    };
    const handleRenderMonthText = (month: moment.Moment) => {
      if (renderMonthText == undefined) return;
      const dayjsize = momentToDayjs(month);
      if (dayjsize === null) return;
      return renderMonthText(dayjsize);
    };

    if (localeData) {
      moment.locale(locale, convertDayjsLocaleDataToObject(localeData));
    } else {
      moment.locale(locale);
    }

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
          startDate={dayjsToMoment(startDate)}
          endDate={dayjsToMoment(endDate)}
          renderMonthText={
            renderMonthText ? handleRenderMonthText : renderMonthText
          }
          renderMonthElement={renderMonthElement as never}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
          onDatesChange={handleDatesChange}
          {...rest}
        />
      </Styled.Container>
    );
  },
);

export default DateRangePicker;
