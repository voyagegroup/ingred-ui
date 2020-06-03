export type Depth = {
  appBar: number;
  modal: number;
  navigationRail: number;
  popover: number;
  tooltip: number;
  snackbar: number;
  toast: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  appBar: 800,
  modal: 999,
  navigationRail: 1200,
  popover: 1500,
  tooltip: 1500,
  snackbar: 1700,
  toast: 1700,
};
