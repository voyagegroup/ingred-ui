import * as React from "react";
import { Flex, Spacer, Typography } from "..";
import { Story } from "@storybook/react/types-6-0";
import Select, { OptionType } from "./Select";

export default {
  title: "Components/Inputs/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
The wrapper of [react-select](https://github.com/JedWatson/react-select).

For more detail props, please see [it](https://react-select.com/props).
`,
      },
      source: {
        type: "code",
      },
    },
  },
};

export const Example = () => {
  const [selected, setSelected] = React.useState<string>("");
  const options = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
  ];
  const handleChange = (option: any) => {
    if (option?.label) setSelected(option.label);
  };
  return (
    <div style={{ height: "200px" }}>
      <div>selected: {selected}</div>
      <Select options={options} onChange={handleChange} />
    </div>
  );
};

export const MultipleSelect = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const options = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
  ];
  const handleChange = (options: any) => {
    if (options == null) {
      setSelected([]);
      return;
    }
    setSelected(options.map((ops: OptionType<number>) => ops.label));
  };
  return (
    <div style={{ height: "200px" }}>
      <div>selected: {selected.join(",")}</div>
      <Select isMulti={true} options={options} onChange={handleChange} />
    </div>
  );
};

export const WithAsyncSearch: Story = () => {
  const baseOptions = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
  ];
  const [selected, setSelected] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<OptionType<number>[]>([]);

  const handleSelect = async (option: any) => {
    if (option?.value) setSelected(option.value);
  };

  const handleInputChange = async (input: string) => {
    if (input === "") {
      setOptions([]);
      return;
    }
    setLoading(true);
    const createdOptions: OptionType<number>[] = await new Promise(
      (resolve) => {
        setTimeout(() => {
          resolve(
            baseOptions.filter((ops) =>
              ops.label.toLowerCase().includes(input.toLowerCase()),
            ),
          );
        }, 1000);
      },
    );
    setOptions(createdOptions);
    setLoading(false);
  };

  return (
    <div style={{ height: "200px" }}>
      <div>selected: {selected}</div>
      <Select
        placeholder="Search with some text..."
        isLoading={loading}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleSelect}
      />
    </div>
  );
};

WithAsyncSearch.parameters = {
  docs: {
    description: {
      story: `
This component cannot use with async callback like [this](https://react-select.com/home#async) so far.

So when you want to use with async callback, please implement as follows.
`,
    },
  },
};

export const DesignSamples = () => {
  const options = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
    { label: "Six", value: 6 },
    { label: "Seven", value: 7 },
    { label: "Eight", value: 8 },
    { label: "Nine", value: 9 },
    { label: "Ten", value: 10 },
  ];
  return (
    <div style={{ height: "300px" }}>
      <Flex display="flex">
        <div>
          <Typography weight="bold">Normal</Typography>
          <Spacer pt={2} />
          <Select minWidth="200px" options={options} />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Disabled</Typography>
          <Spacer pt={2} />
          <Select minWidth="200px" options={options} isDisabled={true} />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Error</Typography>
          <Spacer pt={2} />
          <Select minWidth="200px" options={options} error={true} />
        </div>
      </Flex>
      <Spacer pt={3} />
      <Flex display="flex">
        <div>
          <Typography weight="bold">Opened</Typography>
          <Spacer pt={2} />
          <Select menuIsOpen={true} minWidth="200px" options={options} />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Multiple</Typography>
          <Spacer pt={2} />
          <Select isMulti={true} minWidth="200px" options={options} />
        </div>
      </Flex>
    </div>
  );
};
