import React from "react";
import { StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import MenuList, { MenuListProps } from "./MenuList";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Navigation/MenuList",
  component: MenuList,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {`MenuList is a lower-level component that is leveraged [&lt;Menu /&gt;](${window.location.origin}/?path=/docs/components-navigation-menu--example).`}
          </Markdown>
          <ArgsTable of={MenuList} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<MenuListProps> = {
  render: (args) => {
    return (
      <div style={{ backgroundColor: "silver", padding: "10px" }}>
        <MenuList {...args} />
      </div>
    );
  },
};

export const Basic = {
  ...Template,
  args: {
    contents: [
      { text: "Save", onClick: action('clicked "Save"'), type: "default" },
      { text: "Edit", onClick: action('clicked "Edit"'), type: "default" },
      { text: "Delete", onClick: () => {}, type: "disabled" },
      { text: "Update", onClick: action('clicked "Update"'), type: "warning" },
      {
        text: "Save",
        onClick: action('clicked "Save"'),
        type: "default",
        iconName: "save",
      },
      {
        text: "Edit",
        onClick: action('clicked "Edit"'),
        type: "default",
        iconName: "pencil",
      },
      {
        text: "Delete",
        onClick: () => {},
        type: "disabled",
        iconName: "delete_bin",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "bid_strap",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "check",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "no_link",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "close",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "data_strap",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "desktop_mobile",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "information",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "desktop_mobile",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "line_chart_framed",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "multi_line_chart_framed",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "ad_block",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "add_line",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "alart",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "analytics",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "apps",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "arrow_bottom",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "arrow_double_left",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "arrow_double_right",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "arrow_right",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "arrow_left",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "auction",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "bar_chart_framed",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "base_station",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "braille",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "camera_movie",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "cart_secure",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "checkbox_circle",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "close_circle",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "code_file",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "company",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "company_settings",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "copy",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "dashboard",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "date_range",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "delete_bin",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "desktop",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "document",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "download_cloud",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "exclamation",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "export",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "external_link",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "eye",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "eye_off",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "filter",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "fluct",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "folder",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "folder_open",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "forbid",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "heart_pulse",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "import",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "label",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "line_chart_framed",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "link",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "logout",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "mail",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "mail_open",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "mobile",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "more",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "more_vert",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "pencil",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "notification",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "profile",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "question",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "refresh_line",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "return_line",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "save",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "search",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "setting",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "sort_down",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "sort_inactive",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "sort_up",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "support",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "truck",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "unlink",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "user",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "user_settings",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "zoom_in",
      },
    ],
    maxHeight: "400px",
  },
};

export const Group = {
  ...Template,
  args: {
    contents: [
      {
        title: "Fruits",
        contents: [
          { text: "Apple", onClick: action('clicked "Apple"') },
          { text: "Peach", onClick: action('clicked "Peach"') },
          { text: "Orange", onClick: action('clicked "Orange"') },
          { text: "Strawberry", onClick: action('clicked "Strawberry"') },
        ],
      },
      {
        title: "Vegetables",
        contents: [
          { text: "Cabbage", onClick: action('clicked "Cabbage"') },
          { text: "Carrot", onClick: action('clicked "Carrot"') },
          { text: "Radish", onClick: action('clicked "Radish"') },
          { text: "Cucumber", onClick: action('clicked "Cucumber"') },
        ],
      },
    ],
    maxHeight: "250px",
  },
};
