import React, { useState, useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  type Column,
  type SortDirection,
  DataTable2,
  DataTable2Column,
  DataTable2ColumnLabel,
  DataTable2Head,
  DataTable2Body,
  DataTable2Row,
  DataTable2ActionButton,
  DataTable2InlineEditor,
  DataTable2InlineSelectEditor,
} from "./index";
import Icon from "../Icon";
import ActionButton from "../ActionButton";
import {
  ContextMenu2HeadingItem,
  ContextMenu2ButtonItem,
} from "../ContextMenu2";
import { FilterTagInput } from "../FilterTagInput";

const meta = {
  title: "Components/Data Display/DataTable2",
  component: DataTable2,
  argTypes: {},
} satisfies Meta<typeof DataTable2>;

export default meta;

const mockData = Array.from({ length: 1000 }, (_, i) => ({
  id: `unique-${i}`,
  name: i % 10 === 0 ? `すごく長い苗字すごく長い名前${i}` : `普羅久斗太郎${i}`,
  status: i % 3 === 0 ? "有効" : "無効",
  email: i % 11 === 0 ? `long-long-email.${i}@fluct.jp` : `email.${i}@fluct.jp`,
  date: `2019/08/12`,
}));

export const Overview: StoryObj<typeof DataTable2> = {
  render: () => {
    const [checkedRows, setCheckedRows] = useState<string[]>([]);

    // ページネーション
    const [page, setPage] = useState(0);
    const pageSizeOptions = [10, 20, 50, 100, 200];
    const [pageSize, setPageSize] = useState(pageSizeOptions[3]);

    // コンテンツ
    const [data, setData] = useState(mockData);
    // ページネーションに応じたデータの構築は、コンポーネントの外で行う
    // DataTable2 としては、全件データを持たず、与えられたデータをそのまま表示するだけ
    const pageData = useMemo(
      () => data.slice(page * pageSize, page * pageSize + pageSize),
      [data, pageSize, page],
    );

    const [columns, setColumns] = useState<Column[]>([
      {
        id: crypto.randomUUID(),
        label: "名前",
        order: 0,
        visible: true,
        sortable: false,
        filtered: false,
      },
      {
        id: crypto.randomUUID(),
        label: "ステータス",
        order: 1,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: crypto.randomUUID(),
        label: "メールアドレス",
        order: 2,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: crypto.randomUUID(),
        label: "登録日",
        order: 3,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: crypto.randomUUID(),
        label: "操作",
        order: 4,
        visible: true,
        sortable: false,
      },
    ]);

    // カラム幅（<DataTable2Column />（実質は th）にそれぞれ付与して使う）
    // columns とは更新頻度が違うので、別で管理する。
    const [columnWidths, setColumnWidths] = useState<(number | undefined)[]>([
      188, 188, 188, 188, 188,
      // undefined,
    ]);
    const onWidthChange = useCallback(
      (index: number, width: number | undefined) => {
        const newColumnWidths = [...columnWidths];
        newColumnWidths[index] = width;
        setColumnWidths(newColumnWidths);
      },
      [columnWidths, setColumnWidths],
    );

    // sort 順序状態
    // 名前
    const [nameSort, setNameSort] = useState<SortDirection>();
    // ステータス
    const [statusSort, setStatusSort] = useState<SortDirection>();
    // メールアドレス
    const [emailSort, setEmailSort] = useState<SortDirection>();
    // 登録日
    const [dateSort, setDateSort] = useState<SortDirection>();

    // filter 選択状態
    // 名前
    const [nameFilterType, setNameFilterType] = useState<number>(0);
    const [nameFilterValues, setNameFilterValues] = useState<string[]>([]);
    // ステータス
    const [statusFilterType, setStatusFilterType] = useState<number>(0);
    const [statusFilterValues, setStatusFilterValues] = useState<string[]>([]);
    // メールアドレス
    const [emailFilterType, setEmailFilterType] = useState<number>(0);
    const [emailFilterValues, setEmailFilterValues] = useState<string[]>([]);
    // 登録日
    const [dateFilterType, setDateFilterType] = useState<number>(0);
    const [dateFilterValues, setDateFilterValues] = useState<string[]>([]);
    // フィルタ適用時のカラムの状態にも連動させる
    const changeFilterStatus = useCallback(
      (
        nameValues: typeof nameFilterValues,
        statusValues: typeof statusFilterValues,
        emailValues: typeof emailFilterValues,
        dateValues: typeof dateFilterValues,
      ) => {
        const newColumns = [...columns];
        // フィルタの値が空でない場合、カラムに「フィルタ適用中」を伝える
        newColumns[0].filtered = nameValues.length !== 0;
        newColumns[1].filtered = statusValues.length !== 0;
        newColumns[2].filtered = emailValues.length !== 0;
        newColumns[3].filtered = dateValues.length !== 0;
        setColumns(newColumns);
      },
      [columns],
    );

    const filterTypes = [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
      {
        icon: (
          <Icon
            name="operator_does_not_match"
            type="line"
            color="currentColor"
          />
        ),
        label: "含まない",
      },
      {
        icon: (
          <Icon name="operator_contains" type="line" color="currentColor" />
        ),
        label: "いずれかを含む",
      },
    ];

    return (
      <DataTable2
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        currentPage={page}
        totalCount={data.length}
        rowControls={
          <>
            <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
            <ContextMenu2ButtonItem
              onClick={() => alert(`有効: ${checkedRows.join()}`)}
            >
              有効にする
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem
              onClick={() => alert(`アーカイブ: ${checkedRows.join()}`)}
            >
              アーカイブする
            </ContextMenu2ButtonItem>
            <ContextMenu2HeadingItem onClick={() => alert("任意機能")}>
              操作
            </ContextMenu2HeadingItem>
            <ContextMenu2ButtonItem onClick={() => alert("任意機能")}>
              複製する
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem
              color="danger"
              onClick={() => alert("任意機能")}
            >
              削除する
            </ContextMenu2ButtonItem>
          </>
        }
        extraButtons={
          <DataTable2ActionButton
            prepend={<Icon name="download_cloud" />}
            onClick={() => alert("自由におけるボタン")}
          >
            ダウンロード
          </DataTable2ActionButton>
        }
        onCheckedRowsChange={setCheckedRows}
        onPageSizeChange={setPageSize}
        onPageChange={setPage}
        onColumnsChange={setColumns}
      >
        <DataTable2Head>
          <DataTable2Column
            isResizable
            width={columnWidths[0]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(0, w)}
          >
            <DataTable2ColumnLabel
              showSortButton
              sortButtonDirection={nameSort}
              onSortChange={(direction) => {
                alert(
                  `${direction}: 実際のソート機能は利用者が実装して、data に反映してください`,
                );
                setNameSort(direction);
              }}
            >
              名前
            </DataTable2ColumnLabel>
            <FilterTagInput
              values={nameFilterValues}
              selectedIndex={nameFilterType}
              selectOptions={filterTypes}
              onChange={(values) => {
                setNameFilterValues(values);
                changeFilterStatus(
                  values,
                  statusFilterValues,
                  emailFilterValues,
                  dateFilterValues,
                );
              }}
              onSelectChange={setNameFilterType}
            />
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[1]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(1, w)}
          >
            <DataTable2ColumnLabel
              showSortButton
              sortButtonDirection={statusSort}
              onSortChange={(direction) => {
                alert(
                  `${direction}: 実際のソート機能は利用者が実装して、data に反映してください`,
                );
                setStatusSort(direction);
              }}
            >
              ステータス
            </DataTable2ColumnLabel>
            <FilterTagInput
              values={statusFilterValues}
              selectedIndex={statusFilterType}
              selectOptions={filterTypes}
              onChange={(values) => {
                setStatusFilterValues(values);
                changeFilterStatus(
                  nameFilterValues,
                  values,
                  emailFilterValues,
                  dateFilterValues,
                );
              }}
              onSelectChange={setStatusFilterType}
            />
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[2]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(2, w)}
          >
            <DataTable2ColumnLabel
              showSortButton
              sortButtonDirection={emailSort}
              onSortChange={(direction) => {
                alert(
                  `${direction}: 実際のソート機能は利用者が実装して、data に反映してください`,
                );
                setEmailSort(direction);
              }}
            >
              メールアドレス
            </DataTable2ColumnLabel>
            <FilterTagInput
              values={emailFilterValues}
              selectedIndex={emailFilterType}
              selectOptions={filterTypes}
              onChange={(values) => {
                setEmailFilterValues(values);
                changeFilterStatus(
                  nameFilterValues,
                  statusFilterValues,
                  values,
                  dateFilterValues,
                );
              }}
              onSelectChange={setEmailFilterType}
            />
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[3]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(3, w)}
          >
            <DataTable2ColumnLabel
              showSortButton
              sortButtonDirection={dateSort}
              onSortChange={(direction) => {
                alert(
                  `${direction}: 実際のソート機能は利用者が実装して、data に反映してください`,
                );
                setDateSort(direction);
              }}
            >
              登録日
            </DataTable2ColumnLabel>
            <FilterTagInput
              values={dateFilterValues}
              selectedIndex={dateFilterType}
              selectOptions={filterTypes}
              onChange={(values) => {
                setDateFilterValues(values);
                changeFilterStatus(
                  nameFilterValues,
                  statusFilterValues,
                  emailFilterValues,
                  values,
                );
              }}
              onSelectChange={setDateFilterType}
            />
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[4]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(4, w)}
          >
            <DataTable2ColumnLabel>操作</DataTable2ColumnLabel>
          </DataTable2Column>
        </DataTable2Head>
        <DataTable2Body>
          {pageData.map((dataRow) => (
            <DataTable2Row key={dataRow.id} id={dataRow.id}>
              <td>
                <DataTable2InlineEditor
                  label="名前を編集"
                  value={dataRow.name}
                  onChange={(name) => {
                    const newData = structuredClone(data);
                    newData.find((d) => d.id === dataRow.id)!.name = name;
                    setData(newData);
                  }}
                >
                  <a href="/">{dataRow.name}</a>
                </DataTable2InlineEditor>
              </td>
              <td>
                <DataTable2InlineSelectEditor
                  label="ステータスを変更"
                  value={dataRow.status}
                  options={["有効", "無効"]}
                  onChange={(status) => {
                    const newData = structuredClone(data);
                    newData.find((d) => d.id === dataRow.id)!.status = status;
                    setData(newData);
                  }}
                >
                  {dataRow.status}
                </DataTable2InlineSelectEditor>
              </td>
              <td>{dataRow.email}</td>
              <td>{dataRow.date}</td>
              <td>
                <ActionButton
                  type="button"
                  color="primary"
                  icon="pencil"
                  onClick={() =>
                    alert("ドロワーを開く機能を独自に実装してください")
                  }
                >
                  編集
                </ActionButton>
              </td>
            </DataTable2Row>
          ))}
        </DataTable2Body>
      </DataTable2>
    );
  },
};
