import { ToggleButtonProps } from "..";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Localization {
  components?: {
    ToggleButton?: {
      defaultProps: Pick<ToggleButtonProps, "activeText" | "inActiveText">;
    };
  };
}

export const jaJP: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { activeText: "オン", inActiveText: "オフ" },
    },
  },
};

export const zhCN: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { activeText: "开", inActiveText: "关" },
    },
  },
};

// default
export const enUS: Localization = {
  // No localization needed.
  //
};
