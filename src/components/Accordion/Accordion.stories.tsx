import * as React from "react";
import { StoryObj } from "@storybook/react";
import Accordion, { AccordionProps } from "./Accordion";
import { useState } from "react";
import { ActionButton, Flex } from "..";

export default {
  title: "Components/navigation/Accordion",
  component: Accordion,
  args: {
    title: "title",
    children: "Lorem ipsum dolor sit amet",
    disabled: false,
    expanded: false,
  },
};

export const Example: StoryObj<AccordionProps> = {
  render: (args) => (
    <Accordion
      title={args.title}
      disabled={args.disabled}
      expanded={args.expanded}
    >
      <div style={{ padding: "4px 8px" }}>{args.children}</div>
    </Accordion>
  ),
};

export const Multiple: StoryObj<AccordionProps> = {
  render: () => (
    <>
      <Accordion title="title1">
        <div style={{ padding: "4px 8px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
          magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
        </div>
      </Accordion>
      <Accordion title="title2">
        <div style={{ padding: "4px 8px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
          magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
        </div>
      </Accordion>
      <Accordion disabled title="disabled">
        <div style={{ padding: "4px 8px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
          magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
        </div>
      </Accordion>
    </>
  ),
};

export const Controlled: StoryObj<AccordionProps> = {
  render: () => {
    const [expanded, setExpanded] = React.useState<string | false>("title1");
    const handleChange =
      (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };

    return (
      <>
        <Accordion
          title="title1"
          expanded={expanded === "title1"}
          onChange={handleChange("title1")}
        >
          <div style={{ padding: "4px 8px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
            magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
            augue, efficitur eget tincidunt non, accumsan et est. Aliquam
            lobortis elit lorem, id ullamcorper libero elementum non. Sed rutrum
            porta enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend
            elit.
          </div>
        </Accordion>
        <Accordion
          title="title2"
          expanded={expanded === "title2"}
          onChange={handleChange("title2")}
        >
          <div style={{ padding: "4px 8px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
            magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
            augue, efficitur eget tincidunt non, accumsan et est. Aliquam
            lobortis elit lorem, id ullamcorper libero elementum non. Sed rutrum
            porta enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend
            elit.
          </div>
        </Accordion>
        <Accordion
          title="title3"
          expanded={expanded === "title3"}
          onChange={handleChange("title3")}
        >
          <div style={{ padding: "4px 8px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
            magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
            augue, efficitur eget tincidunt non, accumsan et est. Aliquam
            lobortis elit lorem, id ullamcorper libero elementum non. Sed rutrum
            porta enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend
            elit.
          </div>
        </Accordion>
      </>
    );
  },
};

export const DynamicHeight: StoryObj<AccordionProps> = {
  render: (args) => {
    const [rows, setRows] = useState<number>(1);
    const handleAddRow = () => setRows((prevState) => prevState + 1);
    const handleRemoveRow = () =>
      setRows((prevState) => (prevState > 1 ? prevState - 1 : 1));
    return (
      <Flex display="flex" flexDirection="column" gap={2}>
        <Flex display="flex" flexDirection="row" gap={2}>
          <ActionButton color="primary" icon="add_line" onClick={handleAddRow}>
            Add
          </ActionButton>
          <ActionButton
            color="warning"
            icon="delete_bin"
            onClick={handleRemoveRow}
          >
            Remove
          </ActionButton>
        </Flex>
        <Accordion
          title={args.title}
          disabled={args.disabled}
          expanded={args.expanded}
        >
          {[...Array(rows)].map((_, index) => (
            <div key={index} style={{ padding: "4px 8px" }}>
              {args.children}
            </div>
          ))}
        </Accordion>
      </Flex>
    );
  },
};
