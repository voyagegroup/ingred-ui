import React, { useState, useCallback } from "react";
import {
  DataTable2,
  DataTable2Head,
  DataTable2Column,
  DataTable2Body,
  DataTable2Row,
  type DataTable2Props,
} from "./DataTable2";
import ActionButton from "../ActionButton/ActionButton";
import { StoryObj } from "@storybook/react";

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

export const Overview: StoryObj<DataTable2Props> = {
  render: () => {
    const [columnWidths, setColumnWidths] = useState<(number | undefined)[]>([
      188,
      188,
      188,
      188,
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
          <DataTable2Column width={columnWidths[4]} minWidth={188}>
            操作
          </DataTable2Column>
        </DataTable2Head>
        <DataTable2Body>
          <DataTable2Row id="row1">
            <td>
              <a href="/">普羅久斗太郎</a>
              <ActionButton color="primary" icon="pencil" onClick={() => {}} />
            </td>
            <td>有効</td>
            <td>taro.fluct@fluct.jp</td>
            <td>2019/08/12</td>
            <td>
              <ActionButton color="primary" icon="pencil" onClick={() => {}}>
                編集
              </ActionButton>
            </td>
          </DataTable2Row>
          <DataTable2Row id="row2">
            <td>普羅久斗太郎</td>
            <td>有効</td>
            <td>taro.fluct@fluct.jp</td>
            <td>2019/08/12</td>
            <td>
              <ActionButton color="primary" icon="pencil" onClick={() => {}}>
                編集
              </ActionButton>
            </td>
          </DataTable2Row>
        </DataTable2Body>
      </DataTable2>
    );
  },
};
