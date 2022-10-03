import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { Story } from "@storybook/react/types-6-0";
import moment from "moment";
import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "Components/Inputs/DatePicker",
  component: DatePicker,
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
              "For more detail props, please see [it](https://github.com/airbnb/react-dates#singledatepicker).",
            ].join("\n")}
          />
          <ArgsTable of={DatePicker} />
          <Description
            markdown={[
              "## When the display is strange",
              "",
              "Please import css from `react-dates`.",
              "",
              "```tsx",
              "",
              'import "react-dates/lib/css/_datepicker.css";',
              "```",
            ].join("\n")}
          />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: Story = () => {
  moment.locale("en");
  const [date, setDate] = React.useState(moment());
  const handleChangeDate = (date: moment.Moment | null) => {
    if (date === null) {
      return;
    }
    setDate(date);
  };
  return (
    <div style={{ height: "400px" }}>
      <DatePicker date={date} onDateChange={handleChangeDate} />
    </div>
  );
};

export const Error: Story = () => {
  return <DatePicker date={moment()} error={true} onDateChange={() => {}} />;
};

export const Localize: Story = () => {
  moment.locale("ja", {
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
  });
  const renderMonthText = (day: moment.Moment) => day.format("YYYY年M月");
  const displayFormat = () => "YYYY/MM/DD";
  const [date, setDate] = React.useState(moment());
  const handleChangeDate = (date: moment.Moment | null) => {
    if (date === null) {
      return;
    }
    setDate(date);
  };
  return (
    <div style={{ height: "400px" }}>
      <DatePicker
        date={date}
        displayFormat={displayFormat}
        renderMonthText={renderMonthText}
        onDateChange={handleChangeDate}
      />
    </div>
  );
};
