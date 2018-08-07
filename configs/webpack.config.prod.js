const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const miniCSSExtractPlugin = new MiniCssExtractPlugin({
  filename: "./css/styles.css",
  chunkFilename: "[id].css"
});

const cleanWebpackPlugin = new CleanWebpackPlugin(
  [path.resolve(__dirname, "..", "dist")],
  { verbose: true, allowExternal: true }
);

module.exports = {
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  entry: {
    bundle: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: "/"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "css/fonts/",
              publicPath: "./fonts"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions", "ie > 9"]
              },
              sourceMap: true,
              plugins: () => [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [cleanWebpackPlugin, miniCSSExtractPlugin]
};
