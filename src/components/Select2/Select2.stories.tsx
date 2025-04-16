import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Select2 } from "./Select2";
import { Select2Option, Select2Props } from "./types";

export default {
  title: "Components/Inputs/Select2",
  component: Select2,
  parameters: {
    docs: {
      description: {
        component: `
選択肢の中から項目を選択するコンポーネントです。
検索機能付きのセレクトボックスです。
        `,
      },
    },
  },
} as Meta<typeof Select2>;

const options: Select2Option[] = [
  { value: "apple", label: "りんご" },
  { value: "banana", label: "バナナ" },
  { value: "orange", label: "オレンジ" },
  { value: "grape", label: "ブドウ" },
  { value: "melon", label: "メロン" },
  { value: "peach", label: "桃" },
  { value: "strawberry", label: "イチゴ" },
  { value: "kiwi", label: "キウイ" },
  { value: "pineapple", label: "パイナップル" },
  { value: "mango", label: "マンゴー" },
];

const Template: Story<Select2Props> = (args) => {
  const [value, setValue] = useState<string | number | undefined>(args.value);
  
  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export const Basic: Story<Select2Props> = Template.bind({});
Basic.args = {
  options,
  placeholder: "果物を選択",
};

export const WithError: Story<Select2Props> = Template.bind({});
WithError.args = {
  options,
  placeholder: "果物を選択",
  error: true,
};
WithError.parameters = {
  docs: {
    description: {
      story: 'エラー状態を表示するためのオプションです。エラーメッセージはコンポーネント側では表示されないので、必要に応じてプロダクト側で別途エラーメッセージを実装してください。',
    },
  },
};

export const Disabled: Story<Select2Props> = Template.bind({});
Disabled.args = {
  options,
  placeholder: "果物を選択",
  disabled: true,
};

export const WithDefaultValue: Story<Select2Props> = Template.bind({});
WithDefaultValue.args = {
  options,
  value: "apple",
};

export const Small: Story<Select2Props> = Template.bind({});
Small.args = {
  options,
  placeholder: "果物を選択",
  size: "small",
};

export const Medium: Story<Select2Props> = Template.bind({});
Medium.args = {
  options,
  placeholder: "果物を選択",
  size: "medium",
};

export const Large: Story<Select2Props> = Template.bind({});
Large.args = {
  options,
  placeholder: "果物を選択",
  size: "large",
};

export const LightVariant: Story<Select2Props> = Template.bind({});
LightVariant.args = {
  options,
  placeholder: "果物を選択",
  variant: "light",
};
LightVariant.parameters = {
  docs: {
    description: {
      story: 'デフォルトはlightバリアントです。',
    },
  },
};

export const DarkVariant: Story<Select2Props> = Template.bind({});
DarkVariant.args = {
  options,
  placeholder: "果物を選択",
  variant: "dark",
};

export const WithManyOptions: Story<Select2Props> = Template.bind({});
WithManyOptions.args = {
  options: [
    ...options,
    { value: "watermelon", label: "スイカ" },
    { value: "lemon", label: "レモン" },
    { value: "lime", label: "ライム" },
    { value: "cherry", label: "さくらんぼ" },
    { value: "blueberry", label: "ブルーベリー" },
    { value: "raspberry", label: "ラズベリー" },
    { value: "blackberry", label: "ブラックベリー" },
    { value: "plum", label: "プラム" },
    { value: "persimmon", label: "柿" },
    { value: "fig", label: "イチジク" },
  ],
  placeholder: "果物を選択",
};

export const WithDisabledOptions: Story<Select2Props> = Template.bind({});
WithDisabledOptions.args = {
  options: [
    { value: "apple", label: "りんご" },
    { value: "banana", label: "バナナ", disabled: true },
    { value: "orange", label: "オレンジ" },
    { value: "grape", label: "ブドウ", disabled: true },
    { value: "melon", label: "メロン" },
  ],
  placeholder: "果物を選択",
}; 