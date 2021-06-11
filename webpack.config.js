const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: ['./js/main.ts', './css/style.css', './css/font-awesome.min.css'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|gif|png|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              // publicPath: '../build/',
              // useRelativePaths: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/music/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/video/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html.ejs',
      favicon: 'favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
};
