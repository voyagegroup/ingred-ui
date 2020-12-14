import React from "react";
import styled from "styled-components";
import DataTable from "./";
import Button from "../Button";
import Flex from "../Flex";
import Spacer from "../Spacer";
import Icon from "../Icon";
import TextField from "../TextField";
import Typography from "../Typography";
import ActionButton from "../ActionButton";
import { data } from "./data";
import { Column } from "./DataTable";
import { useTheme } from "../../themes/useTheme";
import { select, boolean, text } from "@storybook/addon-knobs";
import FloatingTip from "../FloatingTip";

export default {
  title: "Components/Data Display/DataTable",
  component: DataTable,
  parameters: {
    docs: { page: null },
  },
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Content = styled.div`
  width: 300px;
`;

type SampleObject = {
  id: number;
  name: string;
  count: number;
};

const sampleData: SampleObject[] = [
  { id: 1, name: "1name", count: 4 },
  { id: 2, name: "2name", count: 8 },
  { id: 3, name: "3name", count: 7 },
  { id: 4, name: "4name", count: 6 },
  { id: 5, name: "5name", count: 5 },
  { id: 6, name: "6name", count: 4 },
  { id: 7, name: "7name", count: 3 },
  { id: 8, name: "8name", count: 2 },
  { id: 9, name: "9name", count: 1 },
  { id: 10, name: "9name", count: 1 },
  { id: 11, name: "9name", count: 2 },
  { id: 12, name: "9name", count: 2 },
  { id: 13, name: "9name", count: 3 },
  { id: 14, name: "9name", count: 3 },
];

export const Overview = () => {
  const verticalSpacing = select(
    "VerticalSpacing",
    {
      Small: "small",
      Medium: "medium",
      Large: "large",
    },
    "medium",
  );
  const fullWidth = boolean("FullWidth", false);
  const tableMaxHeight = text("TableMaxHeight", "none");
  return (
    <Container>
      <DataTable
        data={sampleData}
        defaultSortField="名前"
        defaultSortOrder="desc"
        verticalSpacing={verticalSpacing}
        fullWidth={fullWidth}
        tableMaxHeight={tableMaxHeight}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
          },
          {
            name: "名前",
            selector: (data) => data.name,
            sortable: true,
          },
          {
            name: "カウント",
            selector: (data) => data.count,
            sortable: true,
            align: "right",
          },
        ]}
      />
    </Container>
  );
};

export const WithRowSpan = () => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const handleClick = () => {
    alert(selectedRows.join(","));
  };
  // MEMO: Need to sort data yourself.
  const sampleDataWithDuplicateId: SampleObject[] = [
    { id: 1, name: "1name", count: 9 },
    { id: 1, name: "1name", count: 3 },
    { id: 1, name: "1name", count: 4 },
    { id: 1, name: "2name", count: 9 },
    { id: 1, name: "2name", count: 8 },
    { id: 1, name: "2name", count: 4 },
    { id: 1, name: "2name", count: 3 },
    { id: 2, name: "2name", count: 8 },
    { id: 3, name: "3name", count: 7 },
    { id: 4, name: "4name", count: 6 },
    { id: 5, name: "5name", count: 5 },
    { id: 6, name: "6name", count: 4 },
  ];
  return (
    <Container>
      <Button onClick={handleClick}>選択したアイテムを表示</Button>
      <DataTable
        enableRuledLine={true}
        data={sampleDataWithDuplicateId}
        defaultSortField="名前"
        defaultSortOrder="desc"
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
          },
          {
            name: "名前",
            selector: (data) => data.name,
            enableMergeCell: true,
            sortable: true,
          },
          {
            name: "カウント",
            selector: (data) => data.count,
            // MEMO: Cannot use sort when using "enableMergeCall"
            sortable: true,
            align: "right",
          },
        ]}
        onSelectRowsChange={setSelectedRows}
      />
    </Container>
  );
};

export const WithPagination = () => (
  <Container>
    <DataTable
      enablePagination={true}
      data={data}
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
        },
      ]}
    />
  </Container>
);

export const WithStickyHeader = () => (
  <Container>
    <DataTable
      tableMaxHeight="300px"
      data={data}
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
        },
      ]}
    />
  </Container>
);

export const WithTabs = () => (
  <Container>
    <DataTable
      enablePagination={true}
      tableMaxHeight="500px"
      horizontalScrollable={true}
      tabs={[
        {
          label: "全て",
          filter: (data) => data,
        },
        {
          label: "1~4",
          filter: (data) => data.filter((item) => item.id < 5),
        },
        {
          label: "5~",
          filter: (data) => data.filter((item) => item.id >= 5),
        },
        {
          label: "empty data",
          filter: () => [],
        },
      ]}
      data={sampleData}
      columns={[
        {
          name: "ID",
          selector: (data) => data.id,
        },
        {
          name: "名前",
          selector: (data) => data.name,
          sortable: true,
        },
        {
          name: "カウント",
          selector: (data) => data.count,
          sortable: true,
          align: "right",
        },
        ...[...Array(10)].map((_, i) => ({
          name: `サンプル列${i}`,
          selector: () => `${i}`,
        })),
      ]}
    />
  </Container>
);

export const WithSearch: React.FunctionComponent = () => {
  const [searchText, setSearchText] = React.useState("");
  const searchedItems = sampleData.filter(
    (item) => item.name && item.name.includes(searchText),
  );
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <Container>
      <TextField placeholder="名前で絞り込む" onChange={handleInput} />
      <DataTable
        enablePagination={true}
        data={searchedItems}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
            sortable: true,
          },
          {
            name: "名前",
            selector: (data) => data.name,
            sortable: true,
          },
        ]}
      />
    </Container>
  );
};

export const SelectableRows: React.FunctionComponent = () => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const handleClick = () => {
    alert(selectedRows.join(","));
  };
  return (
    <Container>
      <Button onClick={handleClick}>選択したアイテムを表示</Button>
      <DataTable
        data={sampleData}
        tabs={[
          {
            label: "全て",
            filter: (data) => data,
          },
          {
            label: "1~4",
            filter: (data) => data.filter((item) => item.id < 5),
          },
          {
            label: "5~",
            filter: (data) => data.filter((item) => item.id >= 5),
          },
          {
            label: "empty",
            filter: () => [],
          },
        ]}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
            sortable: true,
          },
          {
            name: "名前",
            selector: (data) => data.name,
            sortable: true,
          },
        ]}
        onSelectRowsChange={setSelectedRows}
      />
    </Container>
  );
};

export const SelectableRow: React.FunctionComponent = () => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const handleClick = () => {
    alert(selectedRow);
  };
  return (
    <Container>
      <Button onClick={handleClick}>選択したアイテムを表示</Button>
      <DataTable
        data={sampleData}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
            sortable: true,
          },
          {
            name: "名前",
            selector: (data) => data.name,
            sortable: true,
          },
        ]}
        onRadioChange={setSelectedRow}
      />
    </Container>
  );
};

export const CustomCell: React.FunctionComponent = () => {
  const theme = useTheme();

  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleIsOpen = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };

  const columns: Column<{ id: number; imp: number }>[] = React.useMemo(
    () => [
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
              <Content>
                <Typography size="sm" lineHeight="1.7">
                  こんな感じで入れられます
                </Typography>
              </Content>
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
    ],
    [isOpen, iconWrapperElement, theme.palette.primary.main],
  );
  return (
    <Container>
      <DataTable data={data} enablePagination={true} columns={columns} />
    </Container>
  );
};

export const WithenableRuledLine = () => (
  <Container>
    <DataTable
      data={sampleData}
      defaultSortField="名前"
      defaultSortOrder="desc"
      enableRuledLine={true}
      columns={[
        {
          name: "ID",
          selector: (data) => data.id,
        },
        {
          name: "名前",
          selector: (data) => data.name,
          sortable: true,
        },
        {
          name: "カウント",
          selector: (data) => data.count,
          sortable: true,
        },
      ]}
    />
  </Container>
);

export const WithEmptyTable = () => {
  const columns: Column<{ id: number; name: string; count: number }>[] = [
    {
      name: "ID",
      selector: (data) => data.id,
    },
    {
      name: "名前",
      selector: (data) => data.name,
      sortable: true,
    },
    {
      name: "カウント",
      selector: (data) => data.count,
      sortable: true,
      align: "right",
    },
  ];

  return (
    <Container>
      <DataTable
        data={[]}
        defaultSortField="名前"
        defaultSortOrder="desc"
        columns={columns}
        itemEmptyProps={{ title: "アイテムが存在しません。" }}
      />
    </Container>
  );
};
