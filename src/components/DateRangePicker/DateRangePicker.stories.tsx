import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";
import dayjs from "dayjs";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import DateRangePicker, { DateRangePickerProps } from "./DateRangePicker";
import "react-dates/lib/css/_datepicker.css";
import "dayjs/locale/ja";
import localeData from "dayjs/plugin/localeData";

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

export const Basic: Story<DateRangePickerProps> = () => {
  // MEMO: To be unaffected by "Localize" story.
  dayjs.locale("en");
  const [date, setDate] = useState({
    startDate: dayjs().set("date", 1),
    endDate: dayjs(),
  });
  const handleChangeDates = (arg: {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
  }) => {
    setDate(arg);
  };
  return (
    <div style={{ height: "400px" }}>
      <DateRangePicker
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={handleChangeDates}
      />
    </div>
  );
};

export const Error: Story<DateRangePickerProps> = () => {
  // MEMO: To be unaffected by "Localize" story.
  dayjs.locale("en");
  return (
    <DateRangePicker
      startDate={dayjs().set("date", 1)}
      endDate={dayjs()}
      error={true}
      onDatesChange={() => {}}
    />
  );
};

export const Localize: Story<DateRangePickerProps> = () => {
  dayjs.locale("ja");
  dayjs.extend(localeData);
  const renderMonthText = (day: dayjs.Dayjs) => day.format("YYYY年M月");
  const displayFormat = () => "YYYY/MM/DD";
  const [date, setDate] = useState({
    startDate: dayjs().set("date", 1),
    endDate: dayjs(),
  });
  const handleChangeDates = (arg: {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
  }) => {
    setDate(arg);
  };
  return (
    <div style={{ height: "400px" }}>
      <DateRangePicker
        startDate={date.startDate}
        endDate={date.endDate}
        locale={"ja"}
        localeData={dayjs().localeData()}
        displayFormat={displayFormat}
        renderMonthText={renderMonthText}
        onDatesChange={handleChangeDates}
      />
    </div>
  );
};
