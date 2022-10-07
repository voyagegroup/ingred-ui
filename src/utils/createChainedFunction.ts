export const createChainedFunction = <F extends (...args: any) => any>(
  ...funcs: (F | null | undefined)[]
) => {
  return function chainedFunction(this: ThisType<any>, ...args: Parameters<F>) {
    funcs.forEach((func) => {
      if (func) func.apply(this, args);
    });
  };
};
