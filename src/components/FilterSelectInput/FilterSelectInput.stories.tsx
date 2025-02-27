import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterSelectInput } from "./index";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterSelectInput",
  component: FilterSelectInput,
  argTypes: {},
} satisfies Meta<typeof FilterSelectInput>;

export default meta;

/**
 * 入力内容をリストから選択させるフィルターの入力です。
 * 利用方法は、FilterTagInput の story 内の説明を参照してください。
 *
 * 自動で横 100% に広がります。必要に応じて、親要素の幅を指定してください。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    value: "項目1",
    values: [
      "項目1",
      "value2",
      "すごく長い値すごく長い値すごく長い値すごく長い値すごく長い値",
      ...Array.from({ length: 20 }, (_, i) => `value${i + 3}`),
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
        <FilterSelectInput
          {...args}
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <div style={{ maxWidth: 200 }}>
          ↓親で幅を指定した例
          <FilterSelectInput
            {...args}
            onChange={(newValue) => updateArgs({ value: newValue })}
            onSelectChange={(newIndex) =>
              updateArgs({ selectedIndex: newIndex })
            }
          />
        </div>
      </>
    );
  },
};
