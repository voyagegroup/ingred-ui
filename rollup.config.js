import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { imagemin } from "rollup-plugin-imagemin";

import pkg from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      interop: 'compat',
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
      interop: 'compat',
    },
  ],
  plugins: [
    peerDepsExternal(),
    url(),
    imagemin(),
    resolve({
      preferBuiltins: false,
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
    isProduction && terser(),
  ],
};
