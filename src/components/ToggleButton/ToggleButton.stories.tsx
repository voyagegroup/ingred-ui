import { Story } from "@storybook/react/types-6-0";
import * as React from "react";
import { Flex, Spacer, Typography } from "..";
import ToggleButton, { ToggleButtonProps } from "./ToggleButton";

export default {
  title: "Components/Inputs/ToggleButton",
  component: ToggleButton,
  parameters: { docs: { source: { type: "code" } } },
};

export const Example: Story<ToggleButtonProps> = (args) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <ToggleButton
      checked={checked}
      onChange={() => setChecked(!checked)}
      {...args}
    />
  );
};

export const DesignSamples = () => (
  <Flex display="flex">
    <div>
      <Typography weight="bold">Checked</Typography>
      <Spacer pt={2} />
      <ToggleButton checked={true} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Unchecked</Typography>
      <Spacer pt={2} />
      <ToggleButton checked={false} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Disabled & Checked</Typography>
      <Spacer pt={2} />
      <ToggleButton disabled={true} checked={true} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Disabled & Unchecked</Typography>
      <Spacer pt={2} />
      <ToggleButton disabled={true} checked={false} />
    </div>
  </Flex>
);
