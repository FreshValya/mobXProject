const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {NODE_ENV} = process.env;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = !IS_DEV;

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.tsx',
  output: {
    filename: IS_PROD ? '[name].[contenthash:10].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                ...(IS_DEV && {localIdentName: '[name]__[local]'}),
                ...(IS_PROD && {localIdentName: '[hash:base64]'}),
              },
            },
          },
          {loader: 'sass-loader'},
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
};
