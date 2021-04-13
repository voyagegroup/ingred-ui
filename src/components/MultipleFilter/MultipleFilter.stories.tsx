import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import MultipleFilter, { MultipleFilterProps } from ".";
import { FilterPackType, ReferedFilterType } from "./types";

export default {
  title: "Components/Utils/MultipleFilter",
  component: MultipleFilter,
  parameters: {
    docs: {
      description: {
        component: `
Set the condition by filterPacks.

You can get the conditions set via ReferedFilters.

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
    filters: [
      {
        filterName: "Demand",
        control: {
          type: "text",
        },
      },
      {
        filterName: "channel",
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

export const Example: Story<MultipleFilterProps> = () => {
  const [filters, setFilters] = React.useState<ReferedFilterType[]>([]);
  const handleChange = (referedFilters: ReferedFilterType[]) => {
    setFilters(referedFilters);
  };

  return (
    <MultipleFilter filterPacks={filterPacksExample} onChange={handleChange} />
  );
};
