import { Palette, createPalette } from "./palette";
import { Radius, Space, Depth, Shadow } from "../styles";
import { DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";
import { DeepPartial } from "../types";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  shadow?: { [key: string]: string };
  spacing?: number;
  radius?: number;
  depth?: DepthOptions;
};

export type Theme = {
  palette: Palette;
  shadow: { [key: string]: string };
  spacing: number;
  radius: number;
  depth: Depth;
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

  return theme;
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
