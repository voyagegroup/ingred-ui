import React from "react";
import DataTable from "./";
import Button from "../Button";
import Flex from "../Flex";
import Spacer from "../Spacer";
import Icon from "../Icon";
import TextField from "../TextField";
import Typography from "../Typography";
import ActionButton from "../ActionButton";
import { data } from "./mockData";
import { DataTableProps } from "./DataTable";
import { useTheme } from "../../themes/useTheme";
import FloatingTip from "../FloatingTip";
import { Story } from "@storybook/react/types-6-0";

export default {
  title: "Components/Data Display/DataTable",
  component: DataTable,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
  args: {
    data: data.slice(0, 4),
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

export const Overview: Story<DataTableProps<any>> = (args) => {
  return <DataTable {...args} />;
};

export const WithVerticalLine: Story<DataTableProps<any>> = (args) => {
  return <DataTable {...args} enableRuledLine={true} />;
};

export const WithPagination: Story<DataTableProps<any>> = (args) => (
  <DataTable {...args} enablePagination={true} data={data} />
);

export const WithStickyHeader: Story<DataTableProps<any>> = (args) => (
  <DataTable {...args} tableMaxHeight="300px" data={data} />
);

export const WithTabs: Story<DataTableProps<any>> = (args) => (
  <DataTable
    {...args}
    enablePagination={true}
    tableMaxHeight="500px"
    horizontalScrollable={true}
    tabs={[
      {
        label: "All",
        filter: (data) => data,
      },
      {
        label: "imp odd",
        filter: (data) => data.filter((item) => item.imp % 2 !== 0),
      },
      {
        label: "imp even",
        filter: (data) => data.filter((item) => item.imp % 2 === 0),
      },
      {
        label: "empty",
        filter: () => [],
      },
    ]}
    data={data}
    columns={[
      ...args.columns,
      ...[...Array(10)].map((_, i) => ({
        name: `サンプル列${i}`,
        selector: () => `${i}`,
      })),
    ]}
  />
);

export const WithSearch: Story<DataTableProps<any>> = (args) => {
  const [searchText, setSearchText] = React.useState("");
  const searchedItems = data.filter((item) =>
    `${item.id}`.includes(searchText),
  );
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <TextField placeholder="IDで絞り込む" onChange={handleInput} />
      <DataTable {...args} enablePagination={true} data={searchedItems} />
    </>
  );
};

export const SelectableRows: Story<DataTableProps<any>> = (args) => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const handleClick = () => {
    alert(selectedRows.join(","));
  };
  return (
    <>
      <Button onClick={handleClick}>選択したアイテムを表示</Button>
      <DataTable
        {...args}
        defaultSelectedRows={[32205]}
        data={data}
        tabs={[
          {
            label: "All",
            filter: (data) => data,
          },
          {
            label: "imp odd",
            filter: (data) => data.filter((item) => item.imp % 2 !== 0),
          },
          {
            label: "imp even",
            filter: (data) => data.filter((item) => item.imp % 2 === 0),
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
};

export const SelectableRow: Story<DataTableProps<any>> = (args) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const handleClick = () => {
    alert(selectedRow);
  };
  return (
    <>
      <Button onClick={handleClick}>選択したアイテムを表示</Button>
      <DataTable
        {...args}
        defaultSelectedRow={32205}
        onRadioChange={setSelectedRow}
      />
    </>
  );
};

export const CustomCell: Story<DataTableProps<any>> = (_args) => {
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
                <div ref={setIconWrapperElement} onClick={handleIsOpen(true)}>
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
};

export const WithEmptyTable: Story<DataTableProps<any>> = (args) => (
  <DataTable
    {...args}
    data={[]}
    itemEmptyProps={{ title: "アイテムが存在しません。" }}
  />
);
