import { Palette, createPalette } from "./palette";
import { Radius, Space, Depth } from "../styles";
import { DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";
import { DeepPartial } from "../types";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  spacing?: number;
  radius?: number;
  depth?: DepthOptions;
};

export type Theme = {
  palette: Palette;
  spacing: number;
  radius: number;
  depth: Depth;
};

export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    radius: radiusInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = spacingInput || Space;
  const radius = radiusInput || Radius;

  const theme = deepmerge({ palette, spacing, depth, radius }, other);

  return theme;
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
