import * as React from "react";
import { StoryObj } from "@storybook/react";
import MultipleFilter, { MultipleFilterProps } from "./MultipleFilter";
import { FilterPackType, ReferredFilterType } from "./types";
import Flex from "../Flex";
import Spacer from "../Spacer";
import { Card } from "../Calendar/styled";
import DataTable from "../DataTable";



export const ContentNarrowDown = {
  TITLE: "TITLE",
  STATUS: "STATUS",
  CONTENT_SOURCE: "CONTENT_SOURCE",
} as const;

export const ContentNarrowDownMap = {
  [ContentNarrowDown.TITLE]: "タイトル",
  [ContentNarrowDown.STATUS]: "ステータス",
  [ContentNarrowDown.CONTENT_SOURCE]: "コンテンツソース",
} as const;

export type ContentNarrowDown = keyof typeof ContentNarrowDown;

export const ContentStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;


export const ContentStatusMap = {
  [ContentStatus.ACTIVE]: "有効",
  [ContentStatus.BLOCKED]: "無効",
} as const;

export default {
  title: "Components/Utils/MultipleFilterWithDataTable",
  component: MultipleFilter,
  parameters: {
    docs: {
      description: {
        component: `
Demonstrates the use of MultipleFilter with DataTable for content filtering.
`,
      },
      source: {
        language: "tsx",
      },
    },
  },
};

const skipFilterPacksExample: FilterPackType[] = [
  {
    categoryName: "タイトル",
    filters: [
      {
        filterName: "",
        conditionTitle: "任意の文字列",
        control: {
          type: "text",
        },
      },
    ],
  },
  {
    categoryName: "ステータス",
    filters: [
      {
        filterName: "",
        control: {
          type: "select",
          options: ["有効", "無効"],
        },
      },
    ],
  },
];

const mockContents: any[] = [
  {
    id: "1",
    title: "title1",
    duration: 100,
    status: "ACTIVE",
    publishedDate: "2021-01-01",
    contentSource: {
      id: "1",
      name: "source1",
      url: "https://source1.com",
      cmsType: {
        id: "1",
        name: "type1",
      },
      isActive: true,
      lastSyncedAt: "2021-01-01",
      archivedAt: "2021-01-01",
    },
  },
  {
    id: "2",
    title: "title2",
    duration: 200,
    status: "BLOCKED",
    publishedDate: "2021-01-02",
    contentSource: {
      id: "2",
      name: "source2",
      url: "https://source2.com",
      cmsType: {
        id: "2",
        name: "type2",
      },
      isActive: false,
      lastSyncedAt: "2021-01-02",
      archivedAt: "2021-01-02",
    },
  },
];

export const FilterableDataTable: StoryObj<MultipleFilterProps> = {
  render: (args) => {
    const [filters, setFilters] = React.useState<ReferredFilterType[]>([]);
    const [filteredData, setFilteredData] = React.useState<any[]>(mockContents);

    const handleChange = (newFilters: ReferredFilterType[]) => {
      console.log("Updated Filters:", newFilters);
      setFilters(newFilters);
    };

    const matchString = (value: string, condition: string): boolean => {
      return value.toLowerCase().includes(condition.toLowerCase());
    };

    const matchFilters = React.useCallback(
      (item: any, filters: ReferredFilterType[]): boolean => {
        return filters.every((filter) => {
          console.log("Matching Filter:", filter);
          switch (filter.categoryName) {
            case "タイトル":
              return matchString(item.title, filter.filterCondition as string);
            case "ステータス": {
              const statusConditions = Array.isArray(filter.filterCondition)
                ? filter.filterCondition
                : [filter.filterCondition];
              return statusConditions.some((condition) =>
                matchString(ContentStatusMap[item.status], condition as string)
              );
            }
            default:
              return true;
          }
        });
      },
      []
    );

    React.useEffect(() => {
      console.log("Filters changed:", filters);
      const newFilteredContents = mockContents.filter((item) =>
        matchFilters(item, filters)
      );
      console.log("Filtered Contents:", newFilteredContents);
      setFilteredData(newFilteredContents);
    }, [filters, matchFilters]);

    return (
      <>
        <Flex
          alignItems="center"
          display="flex"
          flexDirection="row"
          gap={2}
          justifyContent="flex-start"
        >
          <MultipleFilter
            {...args}
            filterPacks={skipFilterPacksExample}
            onChange={handleChange}
          />
        </Flex>
        <Spacer pt={2} />
        <Card p={3}>
          <DataTable
            data={filteredData}
            enablePagination={true}
            dataKey="id"
            columns={[
              {
                name: "Title",
                selector: (a) => a.title,
                sortable: true,
                width: "auto",
              },
              {
                name: "Status",
                sortable: true,
                width: "115px",
                selector: (a) => a.status,
                renderCell: (a) => ContentStatusMap[a.status],
              },
            ]}
          />
        </Card>
      </>
    );
  },
};