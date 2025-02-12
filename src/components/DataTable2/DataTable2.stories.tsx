import React, { useState, useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  DataTable2,
  DataTable2Column,
  DataTable2Head,
  DataTable2Body,
  DataTable2Row,
  DataTable2ActionButton,
  DataTable2InlineEditor,
} from "./index";
import Icon from "../Icon";
import ActionButton from "../ActionButton";

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
    // ページネーション
    const [page, setPage] = useState(0);
    const pageSizeOptions = [10, 20, 50, 100, 200];
    const [pageSize, setPageSize] = useState(pageSizeOptions[3]);

    // コンテンツ
    const [data, setData] = useState(mockData);
    const pageData = useMemo(
      () => data.slice(page * pageSize, page * pageSize + pageSize),
      [data, pageSize, page],
    );

    // カラム幅（<DataTable2Column />（実質は th）にそれぞれ付与して使う）
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
    return (
      <DataTable2
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        currentPage={page}
        numOfItems={data.length}
        extraButtons={
          <DataTable2ActionButton prepend={<Icon name="download_cloud" />}>
            ダウンロード
          </DataTable2ActionButton>
        }
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      >
        <DataTable2Head>
          <DataTable2Column
            isResizable
            width={columnWidths[0]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(0, w)}
          >
            名前
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[1]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(1, w)}
          >
            ステータス
            <br />
            xxx
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[2]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(2, w)}
          >
            メールアドレス
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[3]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(3, w)}
          >
            登録日
          </DataTable2Column>
          <DataTable2Column
            isResizable
            width={columnWidths[4]}
            minWidth={188}
            onWidthChange={(w) => onWidthChange(4, w)}
          >
            操作
          </DataTable2Column>
        </DataTable2Head>
        <DataTable2Body>
          {pageData.map((dataRow) => (
            <DataTable2Row key={dataRow.id} id={dataRow.id}>
              <td>
                <DataTable2InlineEditor
                  trigger={<ActionButton color="primary" icon="pencil" />}
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
              <td>{dataRow.status}</td>
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
