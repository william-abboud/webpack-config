const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserslist = require('browserslist');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

browserslist.clearCaches();

module.exports = env => {
  const isProduction = env && env.production;
  const envStr = isProduction ? "production" : "development";

  console.log(`Running in: ${envStr} mode`);

  const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "build")
  };

  const plugins = [
    new HtmlWebpackPlugin({
      template: PATHS.app + "/index.html"
    }),
  ];

  const productionPlugins = [
    new CleanWebpackPlugin(PATHS.build),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource && resource.match(/\.js$/) && /node_modules/.test(resource)
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // important for the manifest to be last chunk
      minChunks: Infinity
    }),
    new UglifyWebpackPlugin({ sourceMap: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('style.[contenthash:8].css'),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(envStr)
    }),
    //new BundleAnalyzerPlugin(),
  ];

  const developmentPlugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ];

  let cssLoaders = [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        sourceMap: true
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        sourceMap: true,
        plugins: isProduction ?
          [
            require("autoprefixer")(),
            require("cssnano")()
          ]
          :
          [
            require("autoprefixer")()
          ]
      }
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true
      }
    }
  ];

  if (isProduction) {
    plugins.push(...productionPlugins);
    const cssLoadersCopy = [...cssLoaders];

    cssLoadersCopy.shift();

    cssLoaders = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: cssLoadersCopy
    });
  } else {
    plugins.push(...developmentPlugins);
  }

  return {
    entry: {
      app: PATHS.app,
    },
    output: {
      filename: isProduction ? "[name][chunkhash:8].js" : "[name].js",
      path: PATHS.build
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: ["babel-loader"]
        },
        {
          test: /\.scss$/,
          use: cssLoaders
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[hash:8].[ext]",
                context: "src"
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true
              }
            },
          ],
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        },
        {
          test: /\.(woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[hash:8].[ext]",
            context: "src"
          }
        }
      ]
    },
    devServer: {
      open: true,
      compress: true,
      bonjour: true,
      https: true,
      overlay: true,
      hotOnly: true,
      quiet: true, // use friendly errors plugin
      stats: "errors-only",
      host: "0.0.0.0", // access server externally
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    plugins
  };
};
