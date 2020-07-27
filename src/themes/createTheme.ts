import { Palette, createPalette } from "./palette";
import { Space } from "../styles/space";
import { Depth, DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  spacing?: number;
  depth?: DepthOptions;
};

export type Theme = {
  palette: Palette;
  spacing: number;
  depth: Depth;
};

export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = spacingInput || Space;

  const theme = deepmerge({ palette, spacing, depth }, other);

  return theme;
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
