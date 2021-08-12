import * as React from "react";

export type LocaleProviderProps = {
  locale: string;
};

export const LocaleContext = React.createContext<LocaleProviderProps>({
  locale: "default",
});
const LocaleProvider = LocaleContext.Provider;
export default LocaleProvider;
