import React, { useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "@storybook/preview-api";
import { useArgs } from "@storybook/client-api";
import {
  type TableColumn,
  type SortDirection,
  DataTable2,
  DataTable2Column,
  DataTable2ColumnLabel,
  DataTable2Head,
  DataTable2Body,
  DataTable2Row,
  DataTable2Cell,
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
  name:
    i % 10 === 0
      ? `Test_User_123456789_Long_Name_For_Testing${i}`
      : `普羅久斗太郎${i}`,
  status: i % 3 === 0 ? "有効" : "無効",
  email: i % 11 === 0 ? `long-long-email.${i}@fluct.jp` : `email.${i}@fluct.jp`,
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
    ],
    pageSize: pageSizeOptions[3],
    pageSizeOptions,
    currentPage: 0,
    totalCount: mockData.length,
    rowControls: null,
    extraButtons: (
      <DataTable2ActionButton
        prepend={<Icon name="download_cloud" />}
        onClick={() => alert("自由におけるボタン")}
      >
        ダウンロード
      </DataTable2ActionButton>
    ),
    onCheckedRowsChange: () => {},
    onPageSizeChange: () => {},
    onPageChange: () => {},
    onColumnsChange: () => {},
    children: null,
  },
  render: (args) => {
    const [{ columns, currentPage, pageSize }, updateArgs] = useArgs<{
      columns: TableColumn[];
      currentPage: number;
      pageSize: number;
    }>();

    const [checkedRows, setCheckedRows] = useState<string[]>([]);

    // コンテンツ
    const [data, setData] = useState(mockData);
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
          {...args}
          columns={columns}
          totalCount={data.length}
          rowControls={
            <>
              <ContextMenu2HeadingItem>
                ステータスを変更
              </ContextMenu2HeadingItem>
              <ContextMenu2ButtonItem
                closeOnClick
                onClick={() => alert(`有効: ${checkedRows.join()}`)}
              >
                有効にする
              </ContextMenu2ButtonItem>
              <ContextMenu2ButtonItem
                closeOnClick
                onClick={() => alert(`アーカイブ: ${checkedRows.join()}`)}
              >
                アーカイブする
              </ContextMenu2ButtonItem>
              <ContextMenu2HeadingItem
                closeOnClick
                onClick={() => alert("任意機能")}
              >
                操作
              </ContextMenu2HeadingItem>
              <ContextMenu2ButtonItem
                closeOnClick
                onClick={() => alert("任意機能")}
              >
                複製する
              </ContextMenu2ButtonItem>
              <ContextMenu2ButtonItem
                closeOnClick
                color="danger"
                onClick={() => alert("任意機能")}
              >
                削除する
              </ContextMenu2ButtonItem>
            </>
          }
          onCheckedRowsChange={setCheckedRows}
          onPageSizeChange={(pageSize: number) => updateArgs({ pageSize })}
          onPageChange={(currentPage: number) => updateArgs({ currentPage })}
          onColumnsChange={(columns) => {
            updateArgs({ columns });
            // 各カラムのフィルターの状態に応じて、フィルタ入力値をクリアする
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
                title="ステータス"
                size="small"
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
        id: crypto.randomUUID(),
        label: "カラム1",
        order: 0,
        visible: true,
        sortable: false,
        filtered: undefined, // filtered をすべて undefined にすると、フィルター機能が非表示になります
      },
      {
        id: crypto.randomUUID(),
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
    rowControls: null,
    onCheckedRowsChange: () => {},
    onPageSizeChange: () => {},
    onPageChange: () => {},
    onColumnsChange: () => {},
    children: null,
  },
  render: (args) => {
    const [{ columns, currentPage, pageSize }, updateArgs] = useArgs<{
      columns: TableColumn[];
      currentPage: number;
      pageSize: number;
    }>();

    // コンテンツ
    const data = mockData;
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

/**
 * `availableRowIds` プロパティを使用することで、フィルタリング等で表示されない行を選択状態から自動的に除外できます。<br />
 * この例では、名前フィルターを適用すると、フィルターに一致しない行は自動的に選択解除されます。<br />
 * 一括選択時も、`availableRowIds` で指定された行のみが選択されます。
 */
export const WithAvailableRowIds: StoryObj<typeof meta> = {
  args: {
    bordered: false,
    columns: [
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
        sortable: false,
        filtered: false,
      },
    ],
    pageSize: 10,
    pageSizeOptions: [10, 20],
    currentPage: 0,
    totalCount: 10,
    rowControls: (
      <>
        <ContextMenu2HeadingItem>選択されたアイテム</ContextMenu2HeadingItem>
        <ContextMenu2ButtonItem
          closeOnClick
          onClick={() => alert("選択されたアイテムに対する操作")}
        >
          アクションを実行
        </ContextMenu2ButtonItem>
      </>
    ),
    onCheckedRowsChange: () => {},
    onPageSizeChange: () => {},
    onPageChange: () => {},
    onColumnsChange: () => {},
    children: null,
  },
  render: (args) => {
    const [{ columns }, updateArgs] = useArgs<{
      columns: TableColumn[];
    }>();

    const [checkedRows, setCheckedRows] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");

    // サンプルデータ
    const allData = useMemo(
      () => [
        { id: "1", name: "太郎", status: "有効" },
        { id: "2", name: "花子", status: "無効" },
        { id: "3", name: "次郎", status: "有効" },
        { id: "4", name: "美咲", status: "無効" },
        { id: "5", name: "健太", status: "有効" },
      ],
      [],
    );

    // フィルタリングされたデータ
    const filteredData = useMemo(() => {
      if (!nameFilter) return allData;
      return allData.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }, [allData, nameFilter]);

    // 現在有効な行IDのリスト
    const availableRowIds = useMemo(
      () => filteredData.map((item) => item.id),
      [filteredData],
    );

    return (
      <div style={{ height: 500 }}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name-filter">
            名前フィルター:
            <input
              id="name-filter"
              type="text"
              value={nameFilter}
              placeholder="名前を入力..."
              aria-label="名前フィルター"
              style={{ marginLeft: 8, padding: 4 }}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </label>
          <div style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
            選択中: {checkedRows.length}件 | 表示中: {filteredData.length}件 |
            全件数: {allData.length}件
          </div>
          {nameFilter && (
            <div style={{ marginTop: 4, fontSize: 12, color: "#999" }}>
              フィルター適用中: &quot;{nameFilter}&quot; を含む名前のみ表示
            </div>
          )}
        </div>

        <DataTable2
          {...args}
          columns={columns}
          totalCount={filteredData.length}
          availableRowIds={availableRowIds}
          onCheckedRowsChange={setCheckedRows}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
          onColumnsChange={(columns) => updateArgs({ columns })}
        >
          <DataTable2Head>
            <DataTable2Column>
              <DataTable2ColumnLabel>名前</DataTable2ColumnLabel>
            </DataTable2Column>
            <DataTable2Column>
              <DataTable2ColumnLabel>ステータス</DataTable2ColumnLabel>
            </DataTable2Column>
          </DataTable2Head>
          <DataTable2Body>
            {filteredData.map((dataRow) => (
              <DataTable2Row key={dataRow.id} id={dataRow.id}>
                <DataTable2Cell>{dataRow.name}</DataTable2Cell>
                <DataTable2Cell>{dataRow.status}</DataTable2Cell>
              </DataTable2Row>
            ))}
          </DataTable2Body>
        </DataTable2>
      </div>
    );
  },
};
