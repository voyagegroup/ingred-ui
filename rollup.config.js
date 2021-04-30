import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import imagemin from "rollup-plugin-imagemin";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    imagemin(),
    resolve({
      // TODO: Don't use built-in module(https://github.com/voyagegroup/ingred-ui/issues/328)
      preferBuiltins: true,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs({
      namedExports: {
        "node_modules/react-dates/index.js": [
          "DateRangePicker",
          "SingleDatePicker",
        ],
        "node_modules/react-toast-notifications/dist/index.js": [
          "useToasts",
          "ToastProvider",
          "DefaultToastContainer",
        ],
      },
    }),
  ],
};
