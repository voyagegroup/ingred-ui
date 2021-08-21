import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import LocaleProvider, { LocaleProviderProps } from ".";
import { Button, ConfirmModal, Select, ToggleButton } from "..";

import { jaJP } from "../../constants/locale";

import * as locales from "../../constants/locale";

export default {
  title: "Components/Data Display/LocaleProvider",
  component: LocaleProvider,
};

export const Example: Story<LocaleProviderProps> = (args) => {
  const localeOptions = Object.keys(locales).map((_) => ({
    label: _,
    value: _,
  }));
  const [active, setActive] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [localeOption, setLocaleOption] = React.useState(localeOptions[0]);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationChange = (v: { label: string; value: string }) => {
    setLocaleOption(v);
  };

  return (
    <LocaleProvider locale={locales[localeOption.value]}>
      <div>Selected Locale: {localeOption.label} </div>
      <Select
        options={localeOptions}
        defaultValue={localeOptions[0]}
        onChange={handleLocationChange}
      />
      <h2>ToggleButton</h2>
      <ToggleButton active={active} onChange={() => setActive(!active)} />

      <h2>ConfirmModal</h2>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        title="ConfirmModal Example"
        onClose={handleToggleButton}
        onSubmit={() => {
          /** void. Code to show the footer */
        }}
        {...args}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </LocaleProvider>
  );
};
