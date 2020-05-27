const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const outputPath = path.resolve(__dirname, "dist");

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: IS_PRODUCTION ? "production" : "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: outputPath,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
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
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
