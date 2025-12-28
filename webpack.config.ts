import type { Configuration } from 'webpack';
import { container } from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const APP_NAME = 'mfe_app_two';

const config: Configuration = {
  mode: 'development',
  entry: './src/index.ts',

  output: {
    publicPath: 'auto',
    uniqueName: APP_NAME,
    chunkLoadingGlobal: `webpackChunk_${APP_NAME}`,
    crossOriginLoading: 'anonymous',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },


  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
            transpileOnly: true,
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.container.ModuleFederationPlugin({
      name: APP_NAME,
      filename: 'remoteEntry.js',

      exposes: {
        './App': './src/App',
      },

      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],

  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Headers': '*',
    },
  },
};

export default config;