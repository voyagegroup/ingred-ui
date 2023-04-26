import React from "react";
import { LocaleContext } from "../components/LocaleProvider/LocaleProvider";
import { LocalizationComponentName } from "../constants/locale";

/**
 * Overwrite the props by locale if there is no params props.
 * @param params
 * @returns localized Props.
 */
export function useLocaleProps<T>(params: {
  props: React.PropsWithChildren<T>;
  name: LocalizationComponentName;
}) {
  const { name, props } = params;
  const localeContext = React.useContext(LocaleContext);
  const locale = localeContext.locale;
  // Resolve and merge locale props
  const output = { ...props };
  if (!locale || !locale.components) {
    return output;
  }
  const defaultProps = locale.components?.[name]?.defaultProps;

  for (const propName in defaultProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (output[propName] === undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      output[propName] = defaultProps[propName];
    }
  }

  return output;
}
