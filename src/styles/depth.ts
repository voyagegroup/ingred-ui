export type Depth = {
  appBar: number;
  drawer: number;
  dropdown: number;
  modal: number;
  snackbar: number;
  tooltip: number;
  toast: number;
};

export type DepthOptions = Partial<Depth>;

export const depth: Depth = {
  appBar: 1100,
  drawer: 1200,
  // modal 内で、ポータル化したドロップダウンが、
  // モーダルの背面に重ならないように、モーダルよりも少し大きい値を設定する
  dropdown: 1301,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
  toast: 1700,
};
