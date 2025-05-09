import React from "react";
import DataTable, { DataTableProps } from "./DataTable";
import Button from "../Button";
import Flex from "../Flex";
import Spacer from "../Spacer";
import Icon from "../Icon";
import TextField from "../TextField";
import Typography from "../Typography";
import ActionButton from "../ActionButton";
import { data } from "./mockData";
import { useTheme } from "../../themes/useTheme";
import FloatingTip from "../FloatingTip";
import { StoryObj } from "@storybook/react";

type DataType = (typeof data)[number];

export default {
  title: "Components/Data Display/DataTable",
  component: DataTable,
  parameters: {
    docs: {
      source: {
        language: "tsx",
      },
    },
  },
  args: {
    data: data.slice(0, 4),
    dataKey: "id",
    columns: [
      {
        name: "ID",
        selector: (data: any) => data.id,
      },
      {
        name: "Impression",
        selector: (data: any) => data.imp,
      },
      {
        name: "Created at",
        selector: (data: any) => data.created_at,
      },
    ],
  },
};

export const Overview: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => {
    return <DataTable {...args} />;
  },
};

export const WithVerticalLine: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => {
    return <DataTable {...args} enableRuledLine={true} />;
  },
};

export const WithPagination: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => (
    <DataTable {...args} enablePagination={true} data={data} />
  ),
};

export const WithStickyHeader: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => (
    <DataTable {...args} tableMaxHeight="300px" data={data} />
  ),
};

export const WithTabs: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => (
    <DataTable
      {...args}
      enablePagination={true}
      tableMaxHeight="500px"
      horizontalScrollable={true}
      tabs={[
        {
          label: "All",
          filter: (data: DataType[]) => data,
        },
        {
          label: "imp odd",
          filter: (data: DataType[]) =>
            data.filter((item: DataType) => item.imp % 2 !== 0),
        },
        {
          label: "imp even",
          filter: (data: DataType[]) =>
            data.filter((item: DataType) => item.imp % 2 === 0),
        },
        {
          label: "empty",
          filter: () => [],
        },
      ]}
      data={data}
      columns={[
        ...args.columns,
        ...Array.from(Array(10), (_, i) => ({
          name: `サンプル列${i}`,
          selector: () => `${i}`,
        })),
      ]}
    />
  ),
};

export const WithSearch: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => {
    const [searchText, setSearchText] = React.useState("");
    const searchedItems = data.filter((item: DataType) =>
      `${item.id}`.includes(searchText),
    );
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    };
    return (
      <>
        <Spacer mb={2}>
          <TextField placeholder="IDで絞り込む" onChange={handleInput} />
        </Spacer>
        <DataTable {...args} enablePagination={true} data={searchedItems} />
      </>
    );
  },
};

export const SelectableRows: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([32205]);
    const handleClick = () => {
      alert(selectedRows.join(","));
    };
    return (
      <>
        <Button onClick={handleClick}>選択したアイテムを表示</Button>
        <DataTable
          {...args}
          selectedRows={selectedRows}
          data={data}
          tabs={[
            {
              label: "All",
              filter: (data: DataType[]) => data,
            },
            {
              label: "imp odd",
              filter: (data: DataType[]) =>
                data.filter((item: DataType) => item.imp % 2 !== 0),
            },
            {
              label: "imp even",
              filter: (data: DataType[]) =>
                data.filter((item: DataType) => item.imp % 2 === 0),
            },
            {
              label: "empty",
              filter: () => [],
            },
          ]}
          onSelectRowsChange={setSelectedRows}
        />
      </>
    );
  },
};

export const SelectableRow: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => {
    const [selectedRow, setSelectedRow] = React.useState<number>(32205);
    const handleClick = () => {
      alert(selectedRow);
    };
    return (
      <>
        <Button onClick={handleClick}>選択したアイテムを表示</Button>
        <DataTable
          {...args}
          selectedRow={selectedRow}
          onRadioChange={setSelectedRow}
        />
      </>
    );
  },
};

export const CustomCell: StoryObj<DataTableProps<(typeof data)[number], "id">> =
  {
    render: () => {
      const theme = useTheme();
      const [iconWrapperElement, setIconWrapperElement] =
        React.useState<HTMLDivElement | null>(null);
      const [isOpen, setIsOpen] = React.useState<boolean>(false);
      const handleIsOpen = (isOpen: boolean) => () => {
        setIsOpen(isOpen);
      };
      return (
        <DataTable
          data={data}
          dataKey="id"
          enablePagination={true}
          columns={[
            {
              name: "ID",
              selector: (data) => data.id,
              sortable: true,
            },
            {
              name: "imp",
              selector: (data) => data.imp,
              sortable: true,
              renderCell: (data) => (
                <Flex display="flex" alignItems="center">
                  <Spacer pr={0.5}>
                    <Icon name="folder" color={theme.palette.primary.main} />
                  </Spacer>
                  <Typography>{data.imp}</Typography>
                </Flex>
              ),
            },
            {
              name: "操作",
              selector: (data) => data.id,
              headerCell: (
                <>
                  <Flex display="flex" alignItems="center">
                    操作
                    <Spacer pl={1} />
                    <div
                      ref={setIconWrapperElement}
                      onClick={handleIsOpen(true)}
                    >
                      <Icon name="question" type="fill" />
                    </div>
                  </Flex>
                  <FloatingTip
                    baseElement={iconWrapperElement}
                    isOpen={isOpen}
                    positionPriority={["left"]}
                    onClose={handleIsOpen(false)}
                  >
                    <Typography size="sm" lineHeight="1.7">
                      こんな感じで入れられます
                    </Typography>
                  </FloatingTip>
                </>
              ),
              renderCell: () => (
                <Flex display="flex" alignItems="center">
                  <Spacer pr={0.5}>
                    <ActionButton icon="pencil">変更</ActionButton>
                  </Spacer>
                  <ActionButton icon="delete_bin">削除</ActionButton>
                </Flex>
              ),
            },
          ]}
        />
      );
    },
  };

export const WithEmptyTable: StoryObj<DataTableProps<DataType, "id">> = {
  render: (args: DataTableProps<DataType, "id">) => (
    <DataTable
      {...args}
      data={[]}
      itemEmptyProps={{ title: "アイテムが存在しません。" }}
    />
  ),
};
