export type ShadowsType = string[];

// 参照方法は theme.shadows[0] で "none" が取得できるようになる
export const Shadows: ShadowsType = [
  "none",
  // and more...
];

// key-value で持つのもありかもしれない
// 参照方法は theme.shadows.none で "none" が取得できるようになる
// export const ShadowsMap: { [key: string]: string } = {
//   none: "none",
//   // and more...
// };
