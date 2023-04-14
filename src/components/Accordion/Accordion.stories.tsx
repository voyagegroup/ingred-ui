import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import Accordion, { AccordionProps } from "./Accordion";

export default {
  title: "Components/utils/Accordion",
  component: Accordion,
  args: {
    title: "Accordion Title",
  },
};

export const Example: Story<AccordionProps> = (args) => (
  <>
    <Accordion {...args}>
      <div style={{ padding: "4px 8px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
        magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
        augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
        elit lorem, id ullamcorper libero elementum non. Sed rutrum porta enim,
        et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
      </div>
    </Accordion>
    <Accordion {...args}>
      <div style={{ padding: "4px 8px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
        magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
        augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
        elit lorem, id ullamcorper libero elementum non. Sed rutrum porta enim,
        et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
      </div>
    </Accordion>
    <Accordion {...args}>
      <div style={{ padding: "4px 8px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit
        magna, dictum vel elementum ac, fermentum quis lorem. Aliquam sapien
        augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
        elit lorem, id ullamcorper libero elementum non. Sed rutrum porta enim,
        et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
      </div>
    </Accordion>
  </>
);

export const ControlledAccordion: Story<AccordionProps> = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
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
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
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
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
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
          augue, efficitur eget tincidunt non, accumsan et est. Aliquam lobortis
          elit lorem, id ullamcorper libero elementum non. Sed rutrum porta
          enim, et aliquet velit hendrerit ac. Morbi tincidunt eleifend elit.
        </div>
      </Accordion>
    </>
  );
};
