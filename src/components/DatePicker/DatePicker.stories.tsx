import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";
import DatePicker from "./DatePicker";
import "dayjs/locale/ja";
import localeData from "dayjs/plugin/localeData";

export default {
  title: "Components/Inputs/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      source: { language: "tsx" },
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

export const Basic: StoryObj = {
  render: () => {
    dayjs.locale("en");
    const [date, setDate] = React.useState(dayjs());
    const handleChangeDate = (date: dayjs.Dayjs | null) => {
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
  },
};

export const Error: StoryObj = {
  render: () => {
    return <DatePicker date={dayjs()} error={true} onDateChange={() => {}} />;
  },
};

export const Localize: StoryObj = {
  render: () => {
    dayjs.locale("ja");
    dayjs.extend(localeData);
    const renderMonthText = (day: dayjs.Dayjs) => day.format("YYYY年M月");
    const displayFormat = () => "YYYY/MM/DD";
    const [date, setDate] = React.useState(dayjs());
    const handleChangeDate = (date: dayjs.Dayjs | null) => {
      if (date === null) {
        return;
      }
      setDate(date);
    };
    return (
      <div style={{ height: "400px" }}>
        <DatePicker
          date={date}
          locale={"ja"}
          localeData={dayjs().localeData()}
          displayFormat={displayFormat}
          renderMonthText={renderMonthText}
          onDateChange={handleChangeDate}
        />
      </div>
    );
  },
};
