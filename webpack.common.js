const { IN_DIST, IN_SRC } = require('./webpack.paths.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'none', // reset mode and don't perform any optimizations
    context: IN_SRC(), // all configurations are relative to be inside IN_SRC()
    resolve: {
        extensions: ['.js', '.json', '.jsx'] // allows us to drop file extensions when importing
    },
    entry: {
        app: './index.js' // start building dependency stree from here
    },
    output: {
        path: IN_DIST() // output all files here
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // transpile .js/.jsx syntax through babel first
                exclude: /node_modules/, // don't run node packages through babel (optimization)
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/, // handle images
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images' // output in specific folder
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                          bypassOnDebug: true
                        }
                      }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // handle fonts
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts' // output in specific folder
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([ IN_DIST() ]),  // Always clean DIST folder when running webpack
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: IN_SRC('/index.html') // Use index.html template
        })
    ],
};