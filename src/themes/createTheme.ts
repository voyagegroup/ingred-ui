import { Palette, PaletteOptions, createPalette } from "./palette";
import { Space } from "../styles/space";
import { Depth, DepthOptions } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";

export interface ThemeOptions {
  palette?: PaletteOptions;
  spacing?: number;
  depth?: DepthOptions;
}

export interface Theme {
  palette: Palette;
  spacing: number;
  depth: Depth;
}

export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = spacingInput || Space;

  const theme = deepmerge({ palette, spacing }, other);

  return theme;
}

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
