import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import ToggleButton, { ToggleButtonProps } from "./ToggleButton";
import { Flex, Spacer, Typography } from "..";

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
      <Typography weight="bold">Active</Typography>
      <Spacer pt={2} />
      <ToggleButton checked={true} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Inactive</Typography>
      <Spacer pt={2} />
      <ToggleButton checked={false} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Disabled & Active</Typography>
      <Spacer pt={2} />
      <ToggleButton disabled={true} checked={true} />
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Disabled & Inactive</Typography>
      <Spacer pt={2} />
      <ToggleButton disabled={true} checked={false} />
    </div>
  </Flex>
);
