import React from "react";
import { Story } from "@storybook/react/types-6-0";
import moment from "moment";

import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import DateRangePicker, { DateRangePickerProps } from "./DateRangePicker";

export default {
  title: "Components/Inputs/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={[
              "The wrapper of [react-dates](https://github.com/airbnb/react-dates).",
              "",
              "For more detail props, please see [it](https://github.com/airbnb/react-dates#daterangepicker).",
            ].join("\n")}
          />
          <ArgsTable of={DateRangePicker} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: Story<DateRangePickerProps> = () => {
  // MEMO: To be unaffected by "Localize" story.
  moment.locale("en");
  const [startDate, setStartDate] = React.useState(moment().set("date", 1));
  const [endDate, setEndDate] = React.useState(moment());
  const handleChangeDates = (arg: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  }) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };
  return (
    <div style={{ height: "400px" }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleChangeDates}
      />
    </div>
  );
};

export const Error: Story<DateRangePickerProps> = () => {
  // MEMO: To be unaffected by "Localize" story.
  moment.locale("en");
  return (
    <DateRangePicker
      startDate={moment().set("date", 1)}
      endDate={moment()}
      error={true}
      onDatesChange={() => {}}
    />
  );
};

export const Localize: Story<DateRangePickerProps> = () => {
  moment.locale("ja", {
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
  });
  const renderMonthText = (day: moment.Moment) => day.format("YYYY年M月");
  const displayFormat = () => "YYYY/MM/DD";
  const [startDate, setStartDate] = React.useState(moment().set("date", 1));
  const [endDate, setEndDate] = React.useState(moment());
  const handleChangeDates = (arg: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  }) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };
  return (
    <div style={{ height: "400px" }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        displayFormat={displayFormat}
        renderMonthText={renderMonthText}
        onDatesChange={handleChangeDates}
      />
    </div>
  );
};
