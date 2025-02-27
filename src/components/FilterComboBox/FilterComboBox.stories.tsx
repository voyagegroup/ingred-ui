import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterComboBox } from "./index";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterComboBox",
  component: FilterComboBox,
  argTypes: {},
} satisfies Meta<typeof FilterComboBox>;

export default meta;

/**
 * 入力内容をリストから選択させるフィルターの入力です。
 * 利用方法は、FilterTagInput の story 内の説明を参照してください。
 *
 * 自動で横 100% に広がります。必要に応じて、親要素の幅を指定してください。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      "ヒョウ",
      "ライオン",
      "トラ",
      "キリン",
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
        {/* <div style={{ maxWidth: 200 }}>
          ↓親で幅を指定した例
          <FilterComboBox
            {...args}
            onChange={(newValue) => updateArgs({ value: newValue })}
            onSelectChange={(newIndex) =>
              updateArgs({ selectedIndex: newIndex })
            }
          />
        </div> */}
      </>
    );
  },
};
