import moment from "moment";
import * as React from "react";
import styled from "styled-components";
import DatePicker from "../DatePicker";
import Flex from "../Flex";
import Spacer from "../Spacer";

// TODO: add time picker
const TimePickerContainer = styled.input`
  border: ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
`;

const TimePicker = ({ time }: { time: string }) => {
  return <TimePickerContainer type="time" value={time} />;
};

export type DateTimePickerProps = {
  disabele: boolean;
  date?: moment.Moment;
  onChange?: (newDate: moment.Moment, newTime: string) => void;
  children: React.ReactNode;
};

const DateTimePicker: React.FunctionComponent<DateTimePickerProps> = ({
  children,
  date = moment(),
  onChange,
}) => {
  const [datetime, setDatetime] = React.useState(date);
  const [currentDate, setCurrentDate] = React.useState(date);
  const [currentTime, setCurrentTime] = React.useState(date.format("HH:MM:SS"));

  // debug
  console.log(datetime.format("YYYY-MM-DD HH:mm:ss"));

  const handleChange = React.useCallback(
    (newDate: moment.Moment, newTime: string) => {
      if (onChange !== undefined) {
        onChange(newDate, newTime);
      }

      const time = Number(newTime);
      const newDatetime = moment(newDate).add(time, "hours");
      setDatetime(newDatetime);
    },
    []
  );

  const handleChangeDatePicker = React.useCallback(
    (newDate: moment.Moment) => {
      setCurrentDate(newDate);
      handleChange(newDate, currentTime);
    },
    [currentDate]
  );

  const handleChangeTime = React.useCallback(
    (newValue: any) => {
      setCurrentTime(newValue.value);
      handleChange(currentDate, newValue.value);
    },
    [currentTime]
  );

  return (
    <Flex display="flex" alignItems="center">
      <DatePicker date={date} onDateChange={handleChangeDatePicker} />
      <Spacer pr={1} />
      <TimePicker time={currentTime} />
      {children}
    </Flex>
  );
};

export default DateTimePicker;
