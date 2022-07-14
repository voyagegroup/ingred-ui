/**
 * ref: https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/createChainedFunction.ts
 * TODO: resolve "any" type assertion
 */
export function createChainedFunction<F extends Function>(
  ...funcs: (F | null | undefined)[]
): F {
  return funcs.reduce(
    (acc, func) => {
      if (!func) {
        return acc;
      }
      return function chainedFunction(this: any, ...args: any) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    (() => {}) as any, // eslint-disable-line @typescript-eslint/no-empty-function
  );
}
