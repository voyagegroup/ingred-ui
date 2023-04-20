import * as React from "react";
import { StoryObj } from "@storybook/react";
import Accordion, { AccordionProps } from "./Accordion";

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
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
      (panel: string) =>
      (event: React.SyntheticEvent, newExpanded: boolean) => {
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
