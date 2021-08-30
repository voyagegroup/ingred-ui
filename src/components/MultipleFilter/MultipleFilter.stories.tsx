import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import MultipleFilter, { MultipleFilterProps } from ".";
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
        type: "code",
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

export const Example: Story<MultipleFilterProps> = (args) => {
  const [, setFilters] = React.useState<ReferredFilterType[]>([]);
  const handleChange = (referredFilters: ReferredFilterType[]) => {
    setFilters(referredFilters);
  };

  return (
    <MultipleFilter
      {...args}
      filterPacks={filterPacksExample}
      formErrorText={"Form error text can be customized"}
      inputErrorText={"Input error text can be customized"}
      formPlaceholder={"Placeholder can be customized"}
      onChange={handleChange}
    />
  );
};
