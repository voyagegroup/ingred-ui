export type Depth = {
  dropdownMenu: number;
  appBar: number;
  modal: number;
  drawer: number;
  popover: number;
  tooltip: number;
  snackbar: number;
  toast: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  dropdownMenu: 700,
  appBar: 800,
  modal: 999,
  drawer: 1200,
  popover: 1500,
  tooltip: 1500,
  snackbar: 1700,
  toast: 1700,
};
