import * as React from "react";
import DateRangePicker from "./DateRangePicker";
import Typography from "../Typography";
import styled from "styled-components";
import moment from "moment";
import { action } from "@storybook/addon-actions";
import "react-dates/lib/css/_datepicker.css";

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
  title: "DateRangePicker",
  parameters: {
    component: DateRangePicker,
  },
};

export const Overview: React.FunctionComponent = () => {
  const [startDate, setStartDate] = React.useState<moment.Moment | null>(
    moment().set("date", 1),
  );
  const [endDate, setEndDate] = React.useState<moment.Moment | null>(moment());
  const onDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        DateRangePicker
      </Typography>
      <RowContainer>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={onDatesChange}
        />
      </RowContainer>
    </Container>
  );
};

export const withError = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      DateRangePicker
    </Typography>
    <RowContainer>
      <DateRangePicker
        startDate={moment().set("date", 1)}
        endDate={moment()}
        error={true}
        onDatesChange={action("onDatesChange")}
      />
    </RowContainer>
  </Container>
);
