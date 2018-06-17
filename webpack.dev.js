const { IN_DIST } = require('./webpack.paths.js');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devConfig = {
    mode: 'development', // development optimizations
    devtool: 'inline-source-map', // fast source-maps
    devServer: {
        contentBase: IN_DIST(),
        open: true, // open browser
        https: true, // use https
        overlay: true, // display error overlay
        hot: true, // enable hot module replacement
        quiet: true, // use friendly errors plugin
        stats: "errors-only", // display only errors to reduce the amount of output
        host: "0.0.0.0", // access server externally
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // look for .scss files and apply loaders in reverse order
                use: [
                    {
                        loader: 'style-loader', // load css as style tags for faster development
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'css-loader', // convert to css
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')() // autoprefix scss
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader', // transpile sass/scss syntax first
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js', // final outputed file
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  // enable HMR through plugin
        new FriendlyErrorsWebpackPlugin(),
    ]
};

module.exports = merge(common, devConfig);