const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const outputPath = path.resolve(__dirname, "dist");

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  target: "web",
  mode: IS_PRODUCTION ? "production" : "development",
  entry: path.resolve(__dirname, "./index.tsx"),
  output: {
    path: outputPath,
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "styled-components": path.resolve("./node_modules/styled-components"),
    },
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: outputPath,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              // MEMO: トランスパイル後にbabelを噛ませているので、設定は再考する余地がある
              configFile: "tsconfig.json",
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "react-svg-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
