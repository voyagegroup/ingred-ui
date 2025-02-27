import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterInputAbstract } from "./FilterInputAbstract";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterInputAbstract",
  component: FilterInputAbstract,
  argTypes: {},
} satisfies Meta<typeof FilterInputAbstract>;

export default meta;

/**
 * Internal use only!
 * このコンポーネントは内部利用専用です。プロダクトには利用しないでください。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
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
        <FilterInputAbstract
          {...args}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        >
          children
        </FilterInputAbstract>
      </>
    );
  },
};
