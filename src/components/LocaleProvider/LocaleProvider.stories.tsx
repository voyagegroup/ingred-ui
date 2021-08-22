import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import LocaleProvider, { LocaleProviderProps } from ".";
import { Button, ConfirmModal, Select, Spacer, ToggleButton } from "..";

import * as locales from "../../constants/locale";
import FileUploader from "../FileUploader";
import ItemEmpty from "../ItemEmpty";

export default {
  title: "Components/Utils/LocaleProvider",
  component: LocaleProvider,
};

export const Example: Story<LocaleProviderProps> = (args) => {
  const localeOptions = Object.keys(locales).map((_) => ({
    label: _,
    value: _,
  }));
  localeOptions.unshift({ label: "Unspecified(default behavior)", value: "" });
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
      <Spacer pl={2} pt={2} pb={4}>
        <div> Select a locale! </div>
        <Select
          options={localeOptions}
          defaultValue={localeOptions[0]}
          onChange={handleLocationChange}
        />
        <div>Selected locale: {localeOption.value} </div>
      </Spacer>

      <h2>ToggleButton</h2>
      <Spacer pl={2} pt={2} pb={4}>
        <ToggleButton active={active} onChange={() => setActive(!active)} />
      </Spacer>

      <h2>ConfirmModal</h2>
      <Spacer pl={2} pt={2} pb={4}>
        <Button onClick={handleToggleButton}>Open Modal</Button>
        <ConfirmModal
          title="ConfirmModal Test"
          onClose={handleToggleButton}
          onSubmit={() => {
            /** void. Code to show the footer */
          }}
          {...args}
          isOpen={isOpen}
        >
          Content
        </ConfirmModal>
      </Spacer>

      <h2>FileUploader</h2>
      <Spacer pl={2} pt={2} pb={4}>
        <FileUploader onSelectFiles={() => {}} />
      </Spacer>

      <h2>ItemEmpty</h2>
      <Spacer pl={2} pt={2} pb={4}>
        <ItemEmpty />
      </Spacer>
    </LocaleProvider>
  );
};
