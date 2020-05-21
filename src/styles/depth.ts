export type Depth = {
  dropdownMenu: number;
  appBar: number;
  modal: number;
  tooltip: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  dropdownMenu: 700,
  appBar: 800,
  modal: 999,
  tooltip: 1500,
};
