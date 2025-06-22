import { Palette, createPalette } from "./palette";
import { Radius, Space, Depth, Shadow } from "../styles";
import { DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";
import { DeepPartial } from "../types";
import { createFocusInteraction } from "../styles/interaction";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  shadow?: { [key: string]: string };
  spacing?: number;
  radius?: number;
  depth?: DepthOptions;
  interaction?: {
    focus: (isError?: boolean) => string;
  };
};

export type Theme = {
  palette: Palette;
  shadow: { [key: string]: string };
  spacing: number;
  radius: number;
  depth: Depth;
  interaction: {
    focus: (isError?: boolean) => any;
  };
};

export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    shadow: shadowInput,
    spacing: spacingInput,
    radius: radiusInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const shadow = shadowInput || Shadow;
  const spacing = spacingInput || Space;
  const radius = radiusInput || Radius;

  const theme = deepmerge({ palette, shadow, spacing, depth, radius }, other);

  theme.interaction = {
    focus: createFocusInteraction(theme),
  };

  return theme;
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
