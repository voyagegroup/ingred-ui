import * as React from "react";

export type LocaleProviderProps = {
  locale: string;
};

export const LocaleContext = React.createContext<LocaleProviderProps>({
  // The default value locale is used when LocaleContext is omitted.
  locale: "en:US",
});
const LocaleProvider: React.FunctionComponent<LocaleProviderProps> = ({
  locale,
  children,
}) => (
  <LocaleContext.Provider value={{ locale: locale }}>
    {children}
  </LocaleContext.Provider>
);

export default LocaleProvider;
