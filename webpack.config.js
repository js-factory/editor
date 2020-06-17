/* eslint-disable import/no-unresolved */
/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  performance: { hints: false },
  entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
  output: {
    // The name under which the editor will be exported.
    library: 'ClassicEditor',
    path: path.resolve(__dirname, 'package'),
    filename: 'editor.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: /^!/
          }
        },
        extractComments: false
      })
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
      }
    ]
  }
};
