import { action } from "@storybook/addon-actions";
import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { Story } from "@storybook/react/types-6-0";
import React from "react";
import { Flex, Spacer, Typography } from "..";
import ActionButton, { ActionButtonProps } from "./";

export default {
  title: "Components/Inputs/ActionButton",
  component: ActionButton,
  args: {
    onClick: action("clicked"),
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description markdown={"It can behave like a `<button />` tags."} />
          <ArgsTable of={ActionButton} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const DesignSamples: Story<ActionButtonProps> = () => {
  return (
    <Flex display="flex" gap={5}>
      <div>
        <Typography weight="bold">Primary</Typography>
        <Spacer pt={1} />
        <ActionButton icon="pencil" color="primary">
          Edit
        </ActionButton>
      </div>
      <div>
        <Typography weight="bold">Warning</Typography>
        <Spacer pt={1} />
        <ActionButton icon="pencil" color="warning">
          Edit
        </ActionButton>
      </div>
      <div>
        <Typography weight="bold">Disabled</Typography>
        <Spacer pt={1} />
        <ActionButton icon="pencil" disabled={true}>
          Edit
        </ActionButton>
      </div>
    </Flex>
  );
};
