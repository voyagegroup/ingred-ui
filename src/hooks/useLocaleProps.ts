import React from "react";
import { LocaleContext } from "../components/LocaleProvider/LocaleProvider";

/**
 * Overwrite the props by locale if there is no params props.
 * @param params
 * @returns localized Props.
 */
export function useLocaleProps<T>(params: {
  props: React.PropsWithChildren<T>;
  name: string;
}) {
  const { name, props } = params;
  const localeContext = React.useContext(LocaleContext);
  const locale = localeContext.locale;

  // Resolve and merge locale props
  const output = { ...props };
  const defaultProps = locale?.components?.[name].defaultProps;

  for (const propName in defaultProps) {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  }

  return output;
}
