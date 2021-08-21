import * as React from "react";
import { enUS, Localization } from "../../constants/locale";

export type LocaleProviderProps = {
  locale?: Localization;
};

export const LocaleContext = React.createContext<LocaleProviderProps>({
  // Default locale
  locale: enUS,
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
