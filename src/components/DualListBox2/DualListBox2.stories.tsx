import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DualListBox2, DualListBox2Item } from "./";
import { useDualListBox2, type Item } from "./hooks/useDualListBox2";
import { DualListBox2Accordion } from "./DualListBox2Accordion";
import { DualListBox2Section } from "./DualListBox2Section";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Typography from "../Typography";
import Button from "../Button";
import Select from "../Select";
import Flex from "../Flex";

const meta = {
  title: "Components/DualListBox2",
  component: DualListBox2,
  parameters: {
    docs: {
      description: {
        component: "DualListBox2は、アイテムの選択と除外を管理するコンポーネントです。",
      },
    },
  },
} satisfies Meta<typeof DualListBox2>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateItems = (count: number): Item[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    label: `Item ${i + 1}`,
  }));
};

const PAGE_SIZE_OPTIONS = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
];

/**
 * #### ベーシックなタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合、上限が決まっている場合いずれにも使えます。
 */
export const Default: Story = {
  args: {
    included: [],
    excluded: [],
    children: generateItems(30).map((item) => (
      <DualListBox2Item key={item.id} id={item.id}>
        {item.label}
      </DualListBox2Item>
    )),
  },
  render: function Story(args) {
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState("");

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items: generateItems(30),
      onChange: (selected) => console.log("selected:", selected),
    });

    return (
      <Flex flexDirection="column" gap={1}>
        <Select
          value={PAGE_SIZE_OPTIONS.find((option) => option.value === pageSize)}
          onChange={(option) => option && setPageSize(option.value)}
          options={PAGE_SIZE_OPTIONS}
        />
        <DualListBox2
          {...args}
          filter={filter}
          onFilterChange={setFilter}
          included={includedItems}
          excluded={excludedItems}
          onIncludedChange={handleIncludedChange}
          onExcludedChange={handleExcludedChange}
        >
          {generateItems(30).map((item) => (
            <DualListBox2Item
              key={item.id}
              id={item.id}
              disableInclude={isItemIncluded(item.id)}
              disableExclude={isItemExcluded(item.id)}
            >
              {item.label}
            </DualListBox2Item>
          ))}
        </DualListBox2>
      </Flex>
    );
  },
};

/**
 * #### アコーディオンタイプ
 *
 * グループ化されたアイテムを表示する場合に使用します。
 */
export const Accordion: Story = {
  args: {
    included: [],
    excluded: [],
    children: (
      <DualListBox2Accordion label="Group 1">
        {generateItems(30).map((item) => (
          <DualListBox2Item
            key={item.id}
            id={item.id}
            disableInclude={false}
            disableExclude={false}
          >
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2Accordion>
    ),
  },
  render: function Story(args) {
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState("");

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items: generateItems(30),
      onChange: (selected) => console.log("selected:", selected),
    });

    return (
      <Flex flexDirection="column" gap={1}>
        <Select
          value={PAGE_SIZE_OPTIONS.find((option) => option.value === pageSize)}
          onChange={(option) => option && setPageSize(option.value)}
          options={PAGE_SIZE_OPTIONS}
        />
        <DualListBox2
          {...args}
          filter={filter}
          onFilterChange={setFilter}
          included={includedItems}
          excluded={excludedItems}
          onIncludedChange={handleIncludedChange}
          onExcludedChange={handleExcludedChange}
        >
          <DualListBox2Accordion label="Group 1">
            {generateItems(30).map((item) => (
              <DualListBox2Item
                key={item.id}
                id={item.id}
                disableInclude={isItemIncluded(item.id)}
                disableExclude={isItemExcluded(item.id)}
              >
                {item.label}
              </DualListBox2Item>
            ))}
          </DualListBox2Accordion>
        </DualListBox2>
      </Flex>
    );
  },
};

/**
 * #### 「追加」「除外」のいずれかしかできない場合
 *
 * 状況に応じて、`disableExclude`
 */
export const DisableExclude: Story = {
  args: {
    included: [],
    excluded: [],
    children: generateItems(30).map((item) => (
      <DualListBox2Item
        key={item.id}
        id={item.id}
        disableInclude={false}
        disableExclude={false}
      >
        {item.label}
      </DualListBox2Item>
    )),
  },
  render: function Story(args) {
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState("");

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items: generateItems(30),
      onChange: (selected) => console.log("selected:", selected),
    });

    return (
      <Flex flexDirection="column" gap={1}>
        <Select
          value={PAGE_SIZE_OPTIONS.find((option) => option.value === pageSize)}
          onChange={(option) => option && setPageSize(option.value)}
          options={PAGE_SIZE_OPTIONS}
        />
        <DualListBox2
          {...args}
          filter={filter}
          onFilterChange={setFilter}
          included={includedItems}
          excluded={excludedItems}
          onIncludedChange={handleIncludedChange}
          onExcludedChange={handleExcludedChange}
        >
          {generateItems(30).map((item) => (
            <DualListBox2Item
              key={item.id}
              id={item.id}
              disableInclude={isItemIncluded(item.id)}
              disableExclude={isItemExcluded(item.id)}
            >
              {item.label}
            </DualListBox2Item>
          ))}
        </DualListBox2>
      </Flex>
    );
  },
};