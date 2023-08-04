import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { Markdown } from "@storybook/blocks";
import { StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import "react-dates/lib/css/_datepicker.css";
import "dayjs/locale/ja";

export default {
  title: "Components/Inputs/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {[
              "The wrapper of [react-dates](https://github.com/airbnb/react-dates).",
              "",
              "For more detail props, please see [it](https://github.com/airbnb/react-dates#daterangepicker).",
            ].join("\n")}
          </Markdown>
          <ArgsTable of={DateRangePicker} />
          <Markdown>
            {[
              "## When the display is strange",
              "",
              "Please import css from `react-dates`.",
              "",
              "```tsx",
              "",
              'import "react-dates/lib/css/_datepicker.css";',
              "```",
            ].join("\n")}
          </Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: StoryObj = {
  render: () => {
    // MEMO: To be unaffected by "Localize" story.
    dayjs.locale("en");
    const [date, setDate] = useState<{
      startDate: dayjs.Dayjs | null;
      endDate: dayjs.Dayjs | null;
    }>({
      startDate: dayjs().set("date", 1),
      endDate: dayjs(),
    });
    const handleChangeDates = (arg: {
      startDate: dayjs.Dayjs | null;
      endDate: dayjs.Dayjs | null;
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
  },
};

export const Error: StoryObj = {
  render: () => {
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
  },
};

export const Localize: StoryObj = {
  render: () => {
    dayjs.locale("ja");
    dayjs.extend(localeData);
    const renderMonthText = (day: dayjs.Dayjs) => day.format("YYYY年M月");
    const displayFormat = () => "YYYY/MM/DD";
    const [date, setDate] = useState<{
      startDate: dayjs.Dayjs | null;
      endDate: dayjs.Dayjs | null;
    }>({
      startDate: dayjs().set("date", 1),
      endDate: dayjs(),
    });
    const handleChangeDates = (arg: {
      startDate: dayjs.Dayjs | null;
      endDate: dayjs.Dayjs | null;
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
  },
};
