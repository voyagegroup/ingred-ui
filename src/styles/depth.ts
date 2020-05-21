export type Depth = {
  appBar: number;
  modal: number;
  tooltip: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  appBar: 800,
  modal: 999,
  tooltip: 1500,
};
