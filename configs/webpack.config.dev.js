const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: "Boilerplate",
  template: "./public/index.html",
  filename: "index.html"
});

const miniCSSExtractPlugin = new MiniCssExtractPlugin({
  filename: "./css/styles.css",
  chunkFilename: "[id].css"
});

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    bundle: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "/dist")
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
  plugins: [htmlWebpackPlugin, miniCSSExtractPlugin],
  devServer: {
    open: true,
    overlay: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  }
};
