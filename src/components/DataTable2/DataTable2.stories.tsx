import React, { useCallback, useMemo, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "@storybook/preview-api";
import { useArgs } from "@storybook/client-api";
import {
  type TableColumn,
  type SortDirection,
  type TableAction,
  DataTable2,
  DataTable2Column,
  DataTable2ColumnLabel,
  DataTable2Head,
  DataTable2Body,
  DataTable2Row,
  DataTable2Cell,
  DataTable2InlineEditor,
  DataTable2InlineSelectEditor,
} from "./index";
import Icon from "../Icon";
import Button from "../Button";

import { FilterTagInput } from "../FilterTagInput";
import { FilterComboBox } from "../FilterComboBox";
import type { ReactNode } from "react";

// crypto.randomUUIDの代替関数（古いブラウザ対応）
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const meta = {
  title: "Components/Data Display/DataTable2",
  component: DataTable2,
  argTypes: {},
} satisfies Meta<typeof DataTable2>;

export default meta;

const createMockData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `unique-${i}`,
    name:
      i % 10 === 0
        ? `Test_User_123456789_Long_Name_For_Testing${i}`
        : `普羅久斗太郎${i}`,
    status: i % 3 === 0 ? "有効" : "無効",
    email:
      i % 11 === 0 ? `long-long-email.${i}@fluct.jp` : `email.${i}@fluct.jp`,
    date: `2019/08/12`,
  }));

const pageSizeOptions = [10, 20, 50, 100, 200];
const filterTypes = [
  {
    icon: <Icon name="operator_match" type="line" color="currentColor" />,
    label: "含む",
  },
  {
    icon: (
      <Icon name="operator_does_not_match" type="line" color="currentColor" />
    ),
    label: "含まない",
  },
  {
    icon: <Icon name="operator_contains" type="line" color="currentColor" />,
    label: "いずれかを含む",
  },
];

type DataTable2StoryArgs = {
  bordered?: boolean;
  columns: TableColumn[];
  pageSize: number;
  pageSizeOptions: number[];
  currentPage: number;
  totalCount: number;
  tableActions?: TableAction[];
  customTableActionArea?: (props: {
    isSmallLayout: boolean;
    checkedRows: string[];
  }) => ReactNode;

  onCheckedRowsChange: (checkedRows: string[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (currentPage: number) => void;
  onColumnsChange: (columns: TableColumn[]) => void;
  children: ReactNode | null;
};

/**
 * DataTable2 に高さを指定したい場合、親に高さを明示してください。<br />
 * ページの高さにフィットさせたい場合には、親要素に 100vh などを指定してください。<br />
 * 親に高さが明示されていない場合は、「全件表示できる高さ」で表示されます。（レスポンシブに高さを変えても大丈夫です）<br />
 * 例:
 * ```
 *  <div style={{ height: 500 }}>
 *    <DataTable2>...</DataTable2>
 *  <div>
 * ```
 *
 * 表内に表示したいデータは、HTML の `<table>`、`<tr>`、`<td>` の関係と同じように、`<DataTable2>` 内に、 `<DataTable2Row>` を配置し、その中に `<DataTable2Cell>` を配置してください。<br />
 * ページネーションやフィルターの結果はクライアントサイドで実装し、それに応じて `<DataTable2Cell>` を構築しデータを流し込んでください。<br />
 * 構造例（Propsは省略）:
 * ```
 * <DataTable2>
 *   <DataTable2Head>
 *     <DataTable2Column>
 *       <DataTable2ColumnLabel>
 *         名前
 *       </DataTable2ColumnLabel>
 *     </DataTable2Column>
 *     <DataTable2Column>
 *       <DataTable2ColumnLabel>
 *         年齢
 *       </DataTable2ColumnLabel>
 *     </DataTable2Column>
 *   </DataTable2Head>
 *   <DataTable2Body>
 *     <DataTable2Row>
 *       <DataTable2Cell>田中太郎</DataTable2Cell>
 *       <DataTable2Cell>25歳</DataTable2Cell>
 *     </DataTable2Row>
 *     <DataTable2Row>
 *       <DataTable2Cell>鈴木花子</DataTable2Cell>
 *       <DataTable2Cell>22歳</DataTable2Cell>
 *     </DataTable2Row>
 *   </DataTable2Body>
 * </DataTable2>
 * ```
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    bordered: false,
    columns: [
      {
        id: generateUUID(),
        label: "名前",
        order: 0,
        visible: true,
        sortable: false,
        filtered: false,
      },
      {
        id: generateUUID(),
        label: "ステータス",
        order: 1,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: generateUUID(),
        label: "メールアドレス",
        order: 2,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: generateUUID(),
        label: "登録日",
        order: 3,
        visible: true,
        sortable: true,
        filtered: false,
      },
      {
        id: generateUUID(),
        label: "操作",
        order: 4,
        visible: true,
        sortable: false,
      },
    ],
    pageSize: pageSizeOptions[3],
    pageSizeOptions,
    currentPage: 0,
    totalCount: 1000,
    tableActions: [
      // checked時enabled + toolbar（デスクトップ時は左側の直接ボタン、モバイル時は「n件を操作」ドロップダウン）
      {
        type: "groupButton",
        items: [
          {
            label: "有効にする",
            icon: <Icon name="circle" type="fill" color="currentColor" />,
            onClick: (checkedRows) =>
              alert(`有効 (${checkedRows.length}件選択)`),
            enabledWhen: "checked",
            dynamicIconColor: {
              enabled: "success",
              disabled: "currentColor",
            },
          },
          {
            label: "停止する",
            icon: <Icon name="circle" type="fill" color="currentColor" />,
            onClick: (checkedRows) =>
              alert(`停止 (${checkedRows.length}件選択)`),
            enabledWhen: "checked",
            dynamicIconColor: {
              enabled: "danger",
              disabled: "currentColor",
            },
          },
        ],
        enabledWhen: "checked",
        displayIn: "toolbar",
        headingLabel: "ステータスを変更",
      },
      {
        type: "singleButton",
        label: "複製",
        icon: <Icon name="copy" color="currentColor" />,
        onClick: (checkedRows) => alert(`複製 (${checkedRows.length}件選択)`),
        color: "basicLight",
        enabledWhen: "checked",
        displayIn: "toolbar",
        headingLabel: "ステータスを変更",
      },
      {
        type: "singleButton",
        label: "削除",
        icon: <Icon name="delete_bin" color="currentColor" />,
        onClick: (checkedRows) => alert(`削除 (${checkedRows.length}件選択)`),
        color: "basicLight",
        enabledWhen: "checked",
        displayIn: "toolbar",
        headingLabel: "ステータスを変更",
      },

      // checked時enabled + dropdown（デスクトップ時は左側の3点リーダーボタン、モバイル時は「n件を操作」ドロップダウン）
      {
        type: "heading",
        label: "一括操作",
        enabledWhen: "checked",
        displayIn: "dropdown",
      },
      {
        type: "singleButton",
        label: "エクスポート",
        icon: <Icon name="export" color="currentColor" />,
        onClick: (checkedRows) =>
          alert(`エクスポート (${checkedRows.length}件選択)`),
        color: "primary",
        enabledWhen: "checked",
        displayIn: "dropdown",
      },
      {
        type: "singleButton",
        label: "ダウンロード",
        icon: <Icon name="download_cloud" color="currentColor" />,
        onClick: (checkedRows) =>
          alert(`ダウンロード (${checkedRows.length}件選択)`),
        color: "basicLight",
        enabledWhen: "checked",
        displayIn: "dropdown",
      },
      {
        type: "separator",
        enabledWhen: "checked",
        displayIn: "dropdown",
      },
      {
        type: "singleButton",
        label: "その他",
        icon: <Icon name="copy" color="currentColor" />,
        onClick: (checkedRows) => alert(`その他 (${checkedRows.length}件選択)`),
        color: "basicLight",
        enabledWhen: "checked",
        displayIn: "dropdown",
      },

      // unchecked時enabled + toolbar（デスクトップ時は右側の直接ボタン、モバイル時は右側の3点リーダーボタン）
      {
        type: "singleButton",
        label: "新規作成",
        onClick: () => alert("新規作成"),
        enabledWhen: "unchecked",
        color: "primary",
        displayIn: "toolbar",
      },
      // unchecked時enabled + dropdown（デスクトップ・モバイル共に右側の3点リーダーボタン）
      {
        type: "heading",
        label: "データ管理",
        enabledWhen: "unchecked",
        displayIn: "dropdown",
      },
      {
        type: "singleButton",
        label: "インポート",
        icon: <Icon name="import" color="currentColor" />,
        onClick: () => alert("インポート"),
        enabledWhen: "unchecked",
        displayIn: "dropdown",
      },
      {
        type: "singleButton",
        label: "設定",
        icon: <Icon name="setting" color="currentColor" />,
        onClick: () => alert("設定"),
        enabledWhen: "unchecked",
        displayIn: "dropdown",
      },
    ],

    onCheckedRowsChange: () => {},
    onPageSizeChange: () => {},
    onPageChange: () => {},
    onColumnsChange: () => {},
    children: null,
  } as DataTable2StoryArgs,
  render: (args) => {
    const [{ columns, currentPage, pageSize, totalCount }, updateArgs] =
      useArgs<{
        columns: TableColumn[];
        currentPage: number;
        pageSize: number;
        totalCount: number;
      }>();
    // argsからDataTable2Propsのみ抽出
    const { tableActions, customTableActionArea, ...dataTable2Args } = args;

    // totalCountに基づいてmockDataを動的に生成
    const mockData = useMemo(() => createMockData(totalCount), [totalCount]);

    // コンテンツ
    const [data, setData] = useState(mockData);

    // totalCountが変更されたらdataも更新
    useEffect(() => {
      setData(mockData);
    }, [mockData]);

    // カラム幅（<DataTable2Column />（実質は th）にそれぞれ付与して使う）
    // columns とは更新頻度が違うので、別で管理する。
    const [columnWidths, setColumnWidths] = useState<(number | undefined)[]>([
      188, 188, 188, 188, 188,
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
    const [nameSort, setNameSort] = useState<SortDirection>(undefined);
    // ステータス
    const [statusSort, setStatusSort] = useState<SortDirection>(undefined);
    // メールアドレス
    const [emailSort, setEmailSort] = useState<SortDirection>(undefined);
    // 登録日
    const [dateSort, setDateSort] = useState<SortDirection>(undefined);

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

    // フィルタリング関数
    const applyFilter = useCallback(
      (
        data: ReturnType<typeof createMockData>,
        filterType: number,
        filterValues: string[],
        field: keyof ReturnType<typeof createMockData>[0],
      ) => {
        if (filterValues.length === 0) return data;

        switch (filterType) {
          case 0: // 含む
            return data.filter((item) =>
              filterValues.some((value) =>
                String(item[field]).toLowerCase().includes(value.toLowerCase()),
              ),
            );
          case 1: // 含まない
            return data.filter(
              (item) =>
                !filterValues.some((value) =>
                  String(item[field])
                    .toLowerCase()
                    .includes(value.toLowerCase()),
                ),
            );
          case 2: // いずれかを含む
            return data.filter((item) =>
              filterValues.some((value) =>
                String(item[field]).toLowerCase().includes(value.toLowerCase()),
              ),
            );
          default:
            return data;
        }
      },
      [],
    );

    // フィルタリング後のデータ
    const filteredData = useMemo(() => {
      let result = [...data];

      // 名前フィルター
      result = applyFilter(result, nameFilterType, nameFilterValues, "name");
      // ステータスフィルター
      result = applyFilter(
        result,
        statusFilterType,
        statusFilterValues,
        "status",
      );
      // メールアドレスフィルター
      result = applyFilter(result, emailFilterType, emailFilterValues, "email");
      // 登録日フィルター
      result = applyFilter(result, dateFilterType, dateFilterValues, "date");

      return result;
    }, [
      data,
      nameFilterType,
      nameFilterValues,
      statusFilterType,
      statusFilterValues,
      emailFilterType,
      emailFilterValues,
      dateFilterType,
      dateFilterValues,
      applyFilter,
    ]);

    // ページネーションに応じたデータの構築は、コンポーネントの外で行う
    // DataTable2 としては、全件データを持たず、与えられたデータをそのまま表示するだけ
    const pageData = useMemo(
      () =>
        filteredData.slice(
          currentPage * pageSize,
          currentPage * pageSize + pageSize,
        ),
      [filteredData, pageSize, currentPage],
    );
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
        updateArgs({ columns: newColumns });
      },
      [columns, updateArgs],
    );

    return (
      <div style={{ height: 500 }}>
        <DataTable2
          {...dataTable2Args}
          columns={columns}
          totalCount={filteredData.length}
          tableActions={tableActions}
          customTableActionArea={customTableActionArea}
          onCheckedRowsChange={() => {}}
          onPageSizeChange={(pageSize: number) => updateArgs({ pageSize })}
          onPageChange={(currentPage: number) => updateArgs({ currentPage })}
          onColumnsChange={(columns) => {
            updateArgs({ columns });
            columns.forEach((c) => {
              if (c.filtered) return;
              switch (c.id) {
                case columns[0].id:
                  setNameFilterValues([]);
                  break;
                case columns[1].id:
                  setStatusFilterValues([]);
                  break;
                case columns[2].id:
                  setEmailFilterValues([]);
                  break;
                case columns[3].id:
                  setDateFilterValues([]);
                  break;
              }
            });
          }}
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
                title="名前"
                size="small"
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
                  updateArgs({ currentPage: 0 });
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
              <FilterComboBox
                values={statusFilterValues}
                options={["有効", "無効", "保留"]}
                selectedIndex={statusFilterType}
                selectOptions={filterTypes}
                size="small"
                onSelectChange={setStatusFilterType}
                onChange={(values) => {
                  setStatusFilterValues(values);
                  changeFilterStatus(
                    nameFilterValues,
                    values,
                    emailFilterValues,
                    dateFilterValues,
                  );
                  updateArgs({ currentPage: 0 });
                }}
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
                title="メールアドレス"
                size="small"
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
                  updateArgs({ currentPage: 0 });
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
                title="登録日"
                size="small"
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
                  updateArgs({ currentPage: 0 });
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
                <DataTable2Cell>
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
                </DataTable2Cell>
                <DataTable2Cell>
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
                </DataTable2Cell>
                <DataTable2Cell>{dataRow.email}</DataTable2Cell>
                <DataTable2Cell>{dataRow.date}</DataTable2Cell>
                <DataTable2Cell>
                  <Button
                    type="button"
                    color="primaryPale"
                    size="small"
                    inline={true}
                    icon={<Icon name="pencil" color="currentColor" />}
                    onClick={() =>
                      alert("ドロワーを開く機能を独自に実装してください")
                    }
                  >
                    編集
                  </Button>
                </DataTable2Cell>
              </DataTable2Row>
            ))}
          </DataTable2Body>
        </DataTable2>
      </div>
    );
  },
};

/**
 * 以下のように、セルの loading を true に設定すると、スピナーが表示されます。
 * ```
 * <DataTable2Cell loading>
 *   セルの内容
 * </DataTable2Cell>
 * ```
 * また、DataTable2 の props について `rowControls` や `extraButtons` を未指定にすると、該当機能のボタンが表示されません。
 * 「カラム」でフィルターやソートを明示しない場合も、それらの機能は非表示になります。
 */
export const Loading: StoryObj<typeof meta> = {
  args: {
    bordered: false,
    columns: [
      {
        id: generateUUID(),
        label: "カラム1",
        order: 0,
        visible: true,
        sortable: false,
        filtered: undefined, // filtered をすべて undefined にすると、フィルター機能が非表示になります
      },
      {
        id: generateUUID(),
        label: "カラム2",
        order: 1,
        visible: true,
        sortable: false,
        filtered: undefined,
      },
    ],
    pageSize: 50,
    pageSizeOptions: [50],
    currentPage: 0,
    totalCount: 100,
    onCheckedRowsChange: () => {},
    onPageSizeChange: () => {},
    onPageChange: () => {},
    onColumnsChange: () => {},
    children: null,
  },
  render: (args) => {
    const [{ columns, currentPage, pageSize, totalCount }, updateArgs] =
      useArgs<{
        columns: TableColumn[];
        currentPage: number;
        pageSize: number;
        totalCount: number;
      }>();

    // コンテンツ
    const data = useMemo(() => createMockData(totalCount), [totalCount]);
    // ページネーションに応じたデータの構築は、コンポーネントの外で行う
    // DataTable2 としては、全件データを持たず、与えられたデータをそのまま表示するだけ
    const pageData = useMemo(
      () =>
        data.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
      [data, pageSize, currentPage],
    );

    // カラム幅（<DataTable2Column />（実質は th）にそれぞれ付与して使う）
    // columns とは更新頻度が違うので、別で管理する。
    const [columnWidths, setColumnWidths] = useState<(number | undefined)[]>([
      200,
      undefined,
    ]);
    const onWidthChange = useCallback(
      (index: number, width: number | undefined) => {
        const newColumnWidths = [...columnWidths];
        newColumnWidths[index] = width;
        setColumnWidths(newColumnWidths);
      },
      [columnWidths, setColumnWidths],
    );

    return (
      <div style={{ height: 500 }}>
        <DataTable2
          {...args}
          columns={columns}
          totalCount={data.length}
          onCheckedRowsChange={() => {}}
          onPageSizeChange={(pageSize: number) => updateArgs({ pageSize })}
          onPageChange={(currentPage: number) => updateArgs({ currentPage })}
          onColumnsChange={(columns) => {
            console.log(columns);

            updateArgs({ columns });
          }}
        >
          <DataTable2Head>
            <DataTable2Column
              isResizable
              width={columnWidths[0]}
              minWidth={188}
              onWidthChange={(w) => onWidthChange(0, w)}
            >
              <DataTable2ColumnLabel>名前</DataTable2ColumnLabel>
            </DataTable2Column>
            <DataTable2Column
              isResizable
              width={columnWidths[1]}
              minWidth={188}
              onWidthChange={(w) => onWidthChange(1, w)}
            >
              <DataTable2ColumnLabel>ステータス</DataTable2ColumnLabel>
            </DataTable2Column>
          </DataTable2Head>
          <DataTable2Body>
            {pageData.map((dataRow, i) => (
              <DataTable2Row key={dataRow.id} id={dataRow.id}>
                <DataTable2Cell loading={i % 3 === 0}>
                  {dataRow.name}
                </DataTable2Cell>
                <DataTable2Cell loading={i % 5 === 0}>
                  {dataRow.status}
                </DataTable2Cell>
              </DataTable2Row>
            ))}
          </DataTable2Body>
        </DataTable2>
      </div>
    );
  },
};
