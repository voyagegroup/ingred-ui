import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
import Spacer from "../Spacer";

const meta = {
  title: "Components/Layout/Spacer",
  component: Spacer,
  args: {
    p: 3,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {
              "Spacer can easier express `margin` & `padding` with simple props."
            }
          </Markdown>
          <Stories includePrimary title="Stories" />
          <Markdown>
            {[
              "## Configuration",
              "",
              "`Margin` and `Padding` actually rendered is dependent on the theme configuration.",
              "",
              "```tsx",
              "class Example extends React.Component {",
              "  render() {",
              "    const theme = createTheme({ spacing: 8 }); // default is also `8`.",
              "    return (",
              "      <ThemeProvider theme={theme}>",
              "        <Spacer m={3} /> {/* margin: 24px; */}",
              "        <Spacer m={0} /> {/* margin: 0px; */}",
              "        <Spacer m={0.5} /> {/* margin: 4px; */}",
              "      </ThemeProvider>",
              "    );",
              "  }",
              "}",
              "```",
              "",
            ].join("\n")}
          </Markdown>
        </>
      ),
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <>
      <Spacer {...args}>
        <div
          style={{
            border: "1px solid black",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          This Element is wrapped {"<Spacer />"}.
          <br />
          And there is one more {"<Spacer />"} directly below.
        </div>
      </Spacer>
      <Spacer {...args} />
      <div
        style={{
          border: "1px solid black",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        Under {"<Spacer />"}
      </div>
    </>
  ),
};
