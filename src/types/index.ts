// MEMO: from Redux
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type ThemeProps<T> = {
  theme: T;
};

// styled-components v6 では ThemedStyledProps が export されていないので、一時的な対応
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/27c37c808744a70565da66d7e9ebd3f3b8f2f173/types/styled-components/v3/index.d.ts#L12-L16
export type ThemedStyledProps<P, T> = P & ThemeProps<T>;
