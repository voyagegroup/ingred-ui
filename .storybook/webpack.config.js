/**
 * @type import('webpack').Configuration
 */
module.exports = {
  plugins: [],
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json"
            }
          }
        ]
      },
      {
        test: /\.stories\.tsx?$/,
        use: [
          {
            loader: "@storybook/source-loader",
            options: {
              parser: "typescript"
            }
          }
        ],
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
