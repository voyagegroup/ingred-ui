import { StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Button,
  Card,
  ConfirmModal,
  DatePicker,
  MultipleFilter,
  OptionType,
  Select,
  Spacer,
  ToggleButton,
  Typography,
} from "..";
import LocaleProvider, { LocaleProviderProps } from "./LocaleProvider";

import dayjs from "dayjs";
import * as locales from "../../constants/locale";
import FileUploader from "../FileUploader";
import ItemEmpty from "../ItemEmpty";
import { FilterPackType, ReferredFilterType } from "../MultipleFilter/types";

export default {
  title: "Components/Utils/LocaleProvider",
  component: LocaleProvider,
};

const filterPacksExample: FilterPackType[] = [
  {
    categoryName: "Row name",
    filters: [
      {
        filterName: "Demand",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Channel",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Attribute",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Type",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "Linking",
    filters: [
      {
        filterName: "Device",
        control: {
          type: "select",
          options: ["Not selected", "Not Linking", "Linking"],
        },
      },
      {
        filterName: "Site",
        control: {
          type: "select",
          options: ["Not selected", "Not Linking", "Linking"],
        },
      },
    ],
  },
  {
    categoryName: "Condition",
    filters: [
      {
        filterName: "Public",
        control: {
          type: "boolean",
        },
      },
      {
        filterName: "Active",
        control: {
          type: "boolean",
        },
      },
    ],
  },
];

export const Example: StoryObj<LocaleProviderProps> = {
  render: (args) => {
    const localeOptions = Object.keys(locales).map((locale) => ({
      label: locale,
      value: locale as keyof typeof locales,
    }));
    localeOptions.unshift({
      label: "Unspecified(default behavior)",
      value: "" as any,
    });
    const [checked, setChecked] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedLocale, setSelectedLocale] = React.useState<
      OptionType<keyof typeof locales>
    >(localeOptions[1]);
    const handleToggleButton = () => {
      setIsOpen(!isOpen);
    };

    const setFilters = React.useState<ReferredFilterType[]>([])[1];
    const handleChange = (referredFilters: ReferredFilterType[]) => {
      setFilters(referredFilters);
    };

    return (
      <LocaleProvider locale={locales[selectedLocale?.value]}>
        <Spacer pl={2} pt={2} pb={4}>
          <div> Select a locale! </div>
          <Select
            options={localeOptions}
            defaultValue={selectedLocale}
            onChange={(option) => {
              if (!option) return;
              setSelectedLocale(option);
            }}
          />
          <div>
            Selected locale:{" "}
            {selectedLocale !== null ? selectedLocale.value : ""}
          </div>
        </Spacer>

        <h2>ToggleButton</h2>
        <Spacer pl={2} pt={2} pb={4}>
          <ToggleButton
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </Spacer>

        <h2>ConfirmModal</h2>
        <Spacer pl={2} pt={2} pb={4}>
          <Button onClick={handleToggleButton}>Open Modal</Button>
          <ConfirmModal
            title="ConfirmModal Test"
            onClose={handleToggleButton}
            onSubmit={() => {
              /** void. Code to show the footer */
            }}
            {...args}
            isOpen={isOpen}
          >
            Content
          </ConfirmModal>
        </Spacer>

        <h2>FileUploader</h2>
        <Spacer pl={2} pt={2} pb={4}>
          <FileUploader onSelectFiles={() => {}} />
        </Spacer>

        <h2>ItemEmpty</h2>
        <Spacer pl={2} pt={2} pb={4}>
          <ItemEmpty />
        </Spacer>

        <h2>MultipleFilter</h2>
        <Spacer pl={2} pt={2} pb={40}>
          <MultipleFilter
            filterPacks={filterPacksExample}
            onChange={handleChange}
          />
        </Spacer>

        <h2>DatePicker</h2>
        <Typography>
          ※ Needs locale import (e.g. import &apos;moment/locale/ja&apos;).
        </Typography>
        <Spacer pl={2} pt={2} pb={40}>
          <DatePicker date={dayjs()} onDateChange={() => {}} />
        </Spacer>
      </LocaleProvider>
    );
  },
};

export const CustomLocale: StoryObj = {
  render: () => {
    const koKR: locales.Localization = {
      components: {
        ToggleButton: {
          defaultProps: { checkedText: "온", unCheckedText: "오프" },
        },
      },
    };
    const [checked, setChecked] = React.useState<boolean>(false);
    return (
      <LocaleProvider locale={koKR}>
        <h2>Define Custom Locale</h2>
        <Spacer pl={2} pt={2} pb={4}>
          <ToggleButton
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </Spacer>

        <div>You can define a custom locale definition as follows.</div>
        <br />
        <Card>
          <pre>
            &#047;&#047; Custom Locale <br />
            const koKR: locales.Localization = {JSON.stringify(koKR, null, 4)}
            <br />
            <br />
            &#047;&#047; Apply to LocaleProvider <br />
            {"<LocaleProvider locale={koKR}>"}
          </pre>
        </Card>
      </LocaleProvider>
    );
  },
};
