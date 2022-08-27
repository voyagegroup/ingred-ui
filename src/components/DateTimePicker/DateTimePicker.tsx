import moment from "moment";
import * as React from "react";
import DatePicker from "../DatePicker";
import Flex from "../Flex";
import Select, { OptionType } from "../Select";
import Spacer from "../Spacer";
import { options } from "./constants";

export type DateTimePickerProps = {
  isClearable?: boolean;
  timeOptions?: OptionType<string>[];
  date?: moment.Moment;
  defaultTime: string; // wip
  handleChange?: (newDate: moment.Moment, newTime: moment.Moment) => void;
  children: React.ReactNode;
};

const DateTimePicker: React.FunctionComponent<DateTimePickerProps> = ({
  children,
  date = moment(),
  defaultTime = date.format("HH"),
  timeOptions = options,
  isClearable = false,
}) => {
  const [datetime, setDatetime] = React.useState(date);
  const [currentDate, setCurrentDate] = React.useState(date);
  const [currentTime, setCurrentTime] = React.useState(defaultTime);

  // debug
  console.log(datetime.format("YYYY-MM-DD HH:mm:ss"));

  const handleChange = React.useCallback(
    (newDate: moment.Moment, newTime: string) => {
      const time = Number(newTime);
      const newDatetime = moment(newDate).add(time, "hours");
      setDatetime(newDatetime);
    },
    [],
  );

  const handleChangeDatePicker = React.useCallback(
    (newDate: moment.Moment) => {
      setCurrentDate(newDate);
      handleChange(newDate, currentTime);
    },
    [currentDate],
  );

  const handleChangeTime = React.useCallback(
    (newValue: any) => {
      setCurrentTime(newValue.value);
      handleChange(currentDate, newValue.value);
    },
    [currentTime],
  );

  return (
    <Flex display="flex" alignItems="center">
      <DatePicker date={date} onDateChange={handleChangeDatePicker} />
      <Spacer pr={1} />
      <Select
        isClearable={isClearable}
        options={timeOptions}
        defaultValue={options.find(({ value }) => value === defaultTime)}
        onChange={handleChangeTime}
      />
      {children}
    </Flex>
  );
};

export default DateTimePicker;
