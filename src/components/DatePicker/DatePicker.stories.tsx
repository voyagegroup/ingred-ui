import * as React from "react";
import DatePicker from "./DatePicker";
import styled from "styled-components";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { action } from "@storybook/addon-actions";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default {
  title: "DatePicker",
  component:  DatePicker,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [date, setDate] = React.useState<moment.Moment | null>(
    moment().set("date", 1),
  );
  const onDateChange = (date: moment.Moment | null) => {
    setDate(date);
  };
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        DatePicker
      </Typography>
      <RowContainer>
        <DatePicker date={date} onDateChange={onDateChange} />
      </RowContainer>
    </Container>
  );
};

export const withError = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      DatePicker
    </Typography>
    <RowContainer>
      <DatePicker
        date={moment().set("date", 1)}
        error={true}
        onDateChange={action("onDatesChange")}
      />
    </RowContainer>
  </Container>
);
