import type { Configuration } from 'webpack';
import { container } from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const APP_NAME = 'mfe_job_search';

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
    symlinks: true,
    alias: {
      axios: path.resolve(__dirname, "node_modules/axios"),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
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
        'react-router-dom': { singleton: true },
        "@tanstack/react-query": { singleton: true },
        zustand: { singleton: true },
        '@bka-stuff/mfe-utils': { singleton: true },
      },
    }),
  ],

  devServer: {
    port: 3002,
    hot: false,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Headers': '*',
    },
  },
};

export default config;