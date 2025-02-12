import React, { useState, useCallback } from "react";
import { StoryObj } from "@storybook/react";
import {
  DataTable2,
  DataTable2Column,
  DataTable2Head,
  DataTable2Body,
  DataTable2Row,
  DataTable2InlineEditor,
} from "./index";
import ActionButton from "../ActionButton";

export default {
  title: "Components/Data Display/DataTable2",
  component: DataTable2,
  parameters: {
    docs: {
      source: {
        language: "tsx",
      },
    },
  },
  // args: {},
};

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: `unique-${i}`,
  name: i % 10 === 0 ? `すごく長い苗字すごく長い名前${i}` : `普羅久斗太郎${i}`,
  status: i % 3 === 0 ? "有効" : "無効",
  email: i % 11 === 0 ? `long-long-email.${i}@fluct.jp` : `email.${i}@fluct.jp`,
  date: `2019/08/12`,
}));

export const Overview: StoryObj<typeof DataTable2> = {
  render: () => {
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
      <DataTable2>
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
          {mockData.map((data) => (
            <DataTable2Row key={data.id} id={data.id}>
              <td>
                <DataTable2InlineEditor
                  trigger={<ActionButton color="primary" icon="pencil" />}
                  label="名前を編集"
                  value={data.name}
                  onChange={() => {}}
                >
                  <a href="/">{data.name}</a>
                </DataTable2InlineEditor>
              </td>
              <td>{data.status}</td>
              <td>{data.email}</td>
              <td>{data.date}</td>
              <td>
                <ActionButton
                  type="button"
                  color="primary"
                  icon="pencil"
                  onClick={() => {}}
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
