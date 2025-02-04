import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
// import { useArgs } from "@storybook/client-api";
import { FilterTagInput } from "./index";

const meta = {
  title: "Components/Inputs/FilterTagInput",
  component: FilterTagInput,
  argTypes: {},
} satisfies Meta<typeof FilterTagInput>;

export default meta;

/**
 * #### ベーシックなタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合、上限が決まっている場合いずれにも使えます。
 *
 * ---
 *
 * `included` と `excluded` で選択中の値を指定します。
 * 選択状態変更時は、`onIncludedChange` と `onExcludedChange` で、新しい `included` と `excluded` を受け取れるので、これを使って `included` と `excluded` を更新してください。
 *
 * children には、左パネル用の選択できる項目を渡します。右パネルの内容は状態に応じて自動で表示管理されます。
 *
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    values: ["テキスト", "value2", "value3"],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: "forbid",
        label: "含む",
      },
      {
        icon: "forbid",
        label: "含まない",
      },
      {
        icon: "forbid",
        label: "いずれかを含む",
      },
      {
        icon: "forbid",
        label: "で始まる",
      },
      {
        icon: "forbid",
        label: "で終わる",
      },
      {
        icon: "forbid",
        label: "同じ",
      },
      {
        icon: "forbid",
        label: "同じでない",
      },
    ],
  },
  render: (args) => {
    const [values, setValues] = useState<string[]>(args.values);
    const [selectedIndex, setSelectedIndex] = useState<number>(
      args.selectedIndex,
    );
    return (
      <>
        <FilterTagInput
          values={values}
          selectedIndex={selectedIndex}
          selectOptions={args.selectOptions}
          onChange={setValues}
          onSelectChange={setSelectedIndex}
        />
      </>
    );
  },
};
