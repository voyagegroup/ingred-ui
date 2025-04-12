import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterTagInput } from "./index";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterTagInput",
  component: FilterTagInput,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof FilterTagInput>;

export default meta;

/**
 * 入力内容がタグ形式で表示される。<br />
 * 設置される領域が狭い場合、入力領域をモーダルで展開する。
 *
 * ---
 *
 * select 形式の「選択内容（`number`）」とタグ形式の「入力内容（`string[]`）」を管理できます。
 *
 * 選択内容は、選択内容の `selectedIndex` により、`0` から始まる整数で管理します。<br />
 * `selectedIndex` は、select の上からの順です。<br />
 * 選択内容が変更されると、`onSelectChange` で、新しい `selectedIndex` が返されます。
 *
 * 入力内容は `string[]` の配列で管理されます。ユーザーが入力を確定し、それがタグとして追加されると、`onChange` で、新しい配列が返されます。
 *
 * select の選択肢は、`selectOptions` として外から与えてください。<br />
 * 例:
 * ```
 * selectOptions={ [
 *   {
 *     icon: (
 *       <Icon name="operator_match" type="line" color={colors.basic[900]} />
 *     ),
 *     label: "含む",
 *   },
 *   {
 *     icon: (
 *       <Icon
 *         name="operator_does_not_match"
 *         type="line"
 *         color={colors.basic[900]}
 *       />
 *     ),
 *     label: "含まない",
 *   },
 * ] }
 * ```
 *
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    title: "任意タイトル",
    values: ["テキスト", "value2", "value3"],
    selectedIndex: 0,
    selectOptions: [
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
      {
        icon: (
          <Icon name="operator_starts_with" type="line" color="currentColor" />
        ),
        label: "で始まる",
      },
      {
        icon: (
          <Icon name="operator_ends_with" type="line" color="currentColor" />
        ),
        label: "で終わる",
      },
      {
        icon: <Icon name="operator_equal" type="line" color="currentColor" />,
        label: "同じ",
      },
      {
        icon: (
          <Icon name="operator_not_equal" type="line" color="currentColor" />
        ),
        label: "同じでない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterTagInput
          {...args}
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </>
    );
  },
};

export const Sizes: StoryObj<typeof meta> = {
  args: {
    title: "サイズバリエーション",
    values: ["small", "medium", "large"],
    selectedIndex: 0,
    selectOptions: [
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
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterTagInput
          {...args}
          size="small"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterTagInput
          {...args}
          size="medium"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterTagInput
          {...args}
          size="large"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </div>
    );
  },
};
