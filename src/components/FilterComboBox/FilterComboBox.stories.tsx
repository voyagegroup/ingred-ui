import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterComboBox } from "./index";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterComboBox",
  component: FilterComboBox,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "コンポーネントのサイズバリエーション",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
  },
} satisfies Meta<typeof FilterComboBox>;

export default meta;

/**
 * Storybook の Docs の画面では、エンターキーが吸い取られてしまうようです。<br />
 * **キーボード操作を試す場合は、Docs ではない、個別のページで確認してください**
 *
 * 入力内容をリストから選択させるフィルターの入力です。
 * 利用方法は、FilterTagInput の story 内の説明を参照してください。
 *
 * 自動で横 100% に広がります。必要に応じて、親要素の幅を指定してください。
 *
 * ---
 *
 * 選択リストの形式は (string | string[])[] で、「文字列」と「文字列の配列」を混在させることができます。
 * 選択項目が「文字列」の場合は、入力値に含まれる場合フィルタリングされます。
 * 選択項目が「文字列の配列」の場合は、ラベルとしては「文字列の配列[0]」が表示されますが、フィルタリングされる際は「文字列の配列」全体を使ってフィルタリングされます。
 *
 * 例:
 * options の項目が `[ "イルカ", ["パンダ", "ぱんだ", "熊猫"], "ライオン" ]` の場合、ユーザー入力が "ぱんだ"、"パン"、"猫" と入力したときにどの場合にも「パンダ」がフィルタリングされます。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
      "tiger",
      "giraffe",
      ["🐘", "ゾウ", "ぞう", "象"],
      "すごく長い値すごく長い値すごく長い値すごく長い値すごく長い値",
    ],
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
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterComboBox
          {...args}
          onChange={(values) => updateArgs({ values })}
          onSelectChange={(selectedIndex) => updateArgs({ selectedIndex })}
        />
      </>
    );
  },
};

/**
 * サイズバリエーション
 *
 * - small: 高さ28px
 * - medium: 高さ32px（デフォルト）
 * - large: 高さ40px
 */
export const Sizes: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
      "tiger",
      "giraffe",
      ["🐘", "ゾウ", "ぞう", "象"],
    ],
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
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    const handleChange = (values: string[]) => updateArgs({ values });
    const handleSelectChange = (selectedIndex: number) =>
      updateArgs({ selectedIndex });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterComboBox
          {...args}
          size="small"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterComboBox
          {...args}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterComboBox
          {...args}
          size="large"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
      </div>
    );
  },
};
