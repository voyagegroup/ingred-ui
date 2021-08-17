import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import LocaleProvider, { LocaleProviderProps } from ".";
import { Button, ConfirmModal, ToggleButton } from "..";

export default {
  title: "Components/Data Display/LocaleProvider",
  component: LocaleProvider,
};

export const Example: Story<LocaleProviderProps> = (args) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LocaleProvider locale="ja:jp">
      <div>Selected Locale: {args.locale} </div>
      <div>Toggle Button Example. </div>
      <ToggleButton active={active} onChange={() => setActive(!active)} />

      <label>
        ConfirmModal
        <Button onClick={handleToggleButton}>Open Modal</Button>
        <ConfirmModal
          title="ConfirmModal Example Title"
          onClose={handleToggleButton}
          {...args}
          isOpen={isOpen}
        >
          Content
        </ConfirmModal>{" "}
      </label>
    </LocaleProvider>
  );
};
