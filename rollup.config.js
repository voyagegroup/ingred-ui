import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import external from "rollup-plugin-peer-deps-external";
import { imagemin } from "rollup-plugin-imagemin";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

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
      preferBuiltins: false,
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
    isProduction && terser(),
  ],
};
