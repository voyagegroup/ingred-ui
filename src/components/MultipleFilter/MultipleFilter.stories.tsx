import * as React from "react";
import { StoryObj } from "@storybook/react";
import MultipleFilter, { MultipleFilterProps } from "./MultipleFilter";
import Spacer from "../Spacer";
import { FilterPackType, ReferredFilterType } from "./types";

export default {
  title: "Components/Utils/MultipleFilter",
  component: MultipleFilter,
  parameters: {
    docs: {
      description: {
        component: `
Set the condition by filterPacks.

You can get the conditions set via ReferredFilters.

`,
      },
      source: {
        language: "tsx",
      },
    },
  },
};

const filterPacksExample: FilterPackType[] = [
  {
    categoryName: "Row name",
    sectionTitle: "Filter by name",
    filters: [
      {
        filterName: "Demand",
        conditionTitle: "Search word",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Channel",
        conditionTitle: "Search word",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Attribute",
        conditionTitle: "Search word",
        control: {
          type: "text",
        },
      },
      {
        filterName: "Type",
        conditionTitle: "Search word",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "Linking",
    sectionTitle: "Target",
    filters: [
      {
        filterName: "Device",
        conditionTitle: "Condition",
        control: {
          type: "select",
          options: ["Not selected", "Not Linking", "Linking"],
        },
      },
      {
        filterName: "Site",
        conditionTitle: "Condition",
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

const skipFilterPacksExample: FilterPackType[] = [
  {
    categoryName: "Row name",
    filters: [
      {
        filterName: "",
        conditionTitle: "Arbitrary text input",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "Status",
    filters: [
      {
        filterName: "",
        control: {
          type: "select",
          options: ["valid", "invalid"],
        },
      },
    ],
  },
  {
    categoryName: "Condition",
    filters: [
      {
        filterName: "",
        control: {
          type: "boolean",
        },
      },
    ],
  },
];

export const Example: StoryObj<MultipleFilterProps> = {
  render: (args) => {
    const [, setFilters] = React.useState<ReferredFilterType[]>([]);
    const handleChange = (referredFilters: ReferredFilterType[]) => {
      setFilters(referredFilters);
    };

    return (
      <>
        <MultipleFilter
          {...args}
          filterPacks={filterPacksExample}
          inputErrorText={"Input error text can be customized"}
          formPlaceholder={"Placeholder can be customized"}
          onChange={handleChange}
        />
        <Spacer mb={24} />
      </>
    );
  },
};

export const SkipExample: StoryObj<MultipleFilterProps> = {
  render: (args) => {
    const [, setFilters] = React.useState<ReferredFilterType[]>([]);
    const handleChange = (referredFilters: ReferredFilterType[]) => {
      setFilters(referredFilters);
    };

    return (
      <>
        <MultipleFilter
          {...args}
          filterPacks={skipFilterPacksExample}
          inputErrorText={"Input error text can be customized"}
          formPlaceholder={"Placeholder can be customized"}
          onChange={handleChange}
        />
        <Spacer mb={24} />
      </>
    );
  },
};
