export type Depth = {
  appBar: number;
  drawer: number;
  navigationRails: number;
  modal: number;
  popover: number;
  snackbar: number;
  tooltip: number;
  toast: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  appBar: 1100,
  drawer: 1200,
  navigationRails: 1200,
  modal: 1300,
  snackbar: 1400,
  popover: 1500,
  tooltip: 1500,
  toast: 1700,
};
