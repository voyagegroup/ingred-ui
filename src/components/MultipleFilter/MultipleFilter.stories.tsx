import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import MultipleFilter, { MultipleFilterProps } from ".";
import { FilterPackType, ReferedFilterType } from "./types";

export default {
  title: "Components/Utils/MultipleFilter",
  component: MultipleFilter,
};

const filterPacksExample: FilterPackType[] = [
  {
    categoryName: "列名",
    filters: [
      {
        filterName: "デマンド",
        control: {
          type: "text",
        },
      },
      {
        filterName: "チャネル",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "紐付け",
    filters: [
      {
        filterName: "デバイス",
        control: {
          type: "select",
          options: ["未選択", "紐付け未完了", "紐付け完了"],
        },
      },
      {
        filterName: "サイト",
        control: {
          type: "select",
          options: ["未選択", "紐付け未完了", "紐付け完了"],
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
