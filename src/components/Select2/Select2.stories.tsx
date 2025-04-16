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
単一選択と複数選択の両方に対応しています。
        `,
      },
    },
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      description: 'コンポーネントのサイズ',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'コンポーネントのバリアント',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      description: '無効状態',
      table: {
        defaultValue: { summary: false },
      },
    },
    error: {
      options: [true, false],
      control: { type: 'radio' },
      description: 'エラー状態',
      table: {
        defaultValue: { summary: false },
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
  const [value, setValue] = useState<string | number | (string | number)[] | undefined>(args.value);
  
  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        value={value}
        onChange={(newValue: string | number | (string | number)[]) => setValue(newValue)}
      />
    </div>
  );
};

export const Basic: Story<Select2Props> = Template.bind({});
Basic.args = {
  options,
  placeholder: "果物を選択",
};

export const Error: Story<Select2Props> = Template.bind({});
Error.args = {
  options,
  placeholder: "果物を選択",
  error: true,
};
Error.parameters = {
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

export const MultipleSelection: Story<Select2Props> = (args) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(["apple", "orange"]);
  
  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        value={selectedValues}
        onChange={(newValues: string | number | (string | number)[]) => {
          if (Array.isArray(newValues)) {
            setSelectedValues(newValues);
          }
        }}
        multiple={true}
      />
      <div style={{ marginTop: "16px" }}>
        <p>選択された値: {selectedValues.join(', ')}</p>
      </div>
    </div>
  );
};
MultipleSelection.args = {
  options,
  placeholder: "果物を選択（複数可）",
  applyButtonText: "適用",
  cancelButtonText: "キャンセル",
};
MultipleSelection.parameters = {
  docs: {
    description: {
      story: '複数選択モード（multiple={true}）では、複数の選択肢を選択できます。選択はContextMenu内で一時的に保持され、「適用」ボタンをクリックすると確定されます。選択済みの項目はタグとして表示され、タグの削除ボタンをクリックすると選択を解除できます。',
    },
  },
};
