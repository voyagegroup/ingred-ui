import * as React from "react";
import { StoryObj } from "@storybook/react";
import MultipleFilter, { MultipleFilterProps } from "./MultipleFilter";
import Spacer from "../Spacer";
import { FilterPackType, ReferredFilterType } from "./types";
import DataTable from "../DataTable";

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

const filterPacksWithDataTableExample: FilterPackType[] = [
  {
    categoryName: "Product",
    filters: [
      {
        filterName: "",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "Category",
    filters: [
      {
        filterName: "",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "InStock",
    filters: [
      {
        filterName: "",
        control: {
          type: "select",
          options: ["Yes", "No"],
        },
      },
    ],
  },
];

export const WithDataTableExample: StoryObj<MultipleFilterProps> = {
  render: (args) => {
    const data = [
      { id: 1, product: "Laptop", category: "Electronics", inStock: "Yes" },
      { id: 2, product: "Smartphone", category: "Electronics", inStock: "Yes" },
      { id: 3, product: "Headphones", category: "Audio", inStock: "No" },
      { id: 4, product: "Running Shoes", category: "Sports", inStock: "Yes" },
      { id: 5, product: "Coffee Maker", category: "Kitchen", inStock: "Yes" },
      { id: 6, product: "Desk Chair", category: "Furniture", inStock: "No" },
      { id: 7, product: "Tablet", category: "Electronics", inStock: "Yes" },
      { id: 8, product: "Backpack", category: "Accessories", inStock: "Yes" },
      { id: 9, product: "Smartwatch", category: "Electronics", inStock: "No" },
      { id: 10, product: "Blender", category: "Kitchen", inStock: "Yes" },
      { id: 11, product: "Yoga Mat", category: "Sports", inStock: "Yes" },
      { id: 12, product: "Bookshelf", category: "Furniture", inStock: "Yes" },
      {
        id: 13,
        product: "Wireless Mouse",
        category: "Electronics",
        inStock: "Yes",
      },
      {
        id: 14,
        product: "Portable Charger",
        category: "Accessories",
        inStock: "No",
      },
      { id: 15, product: "Air Purifier", category: "Home", inStock: "Yes" },
    ];

    type DataItem = (typeof data)[number];

    const [filteredData, setFilteredData] = React.useState<DataItem[]>(data);

    const handleChange: MultipleFilterProps["onChange"] = (referredFilters) => {
      const newFilteredData = data.filter((item) => {
        return referredFilters.every((filter) => {
          const condition = (
            (filter.filterCondition as string) || ""
          ).toLowerCase();

          switch (filter.categoryName) {
            case "InStock":
              return item.inStock.toLowerCase() === condition;
            case "Product":
              return item.product.toLowerCase().includes(condition);
            case "Category":
              return item.category.toLowerCase().includes(condition);
            default:
              return true;
          }
        });
      });

      setFilteredData(newFilteredData);
    };

    return (
      <>
        <MultipleFilter
          {...args}
          filterPacks={filterPacksWithDataTableExample}
          inputErrorText="Input error text can be customized"
          formPlaceholder="Placeholder can be customized"
          onChange={handleChange}
        />
        <Spacer mb={2} />
        <DataTable
          data={filteredData}
          columns={[
            {
              name: "Product",
              selector: (a) => a.product,
            },
            {
              name: "Category",
              selector: (a) => a.category,
            },
            {
              name: "In Stock",
              selector: (a) => a.inStock,
            },
          ]}
          dataKey="id"
        />
        <Spacer mb={12} />
      </>
    );
  },
};
