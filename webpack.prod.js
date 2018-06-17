const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

const prodConfig = {
    mode: 'production', // enable production optimizations
    devtool: 'source-map', // enable highest quality source maps
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({ sourceMap: true }), // uglify JS
            new OptimizeCSSAssetsPlugin() // cssnano CSS
        ],
        splitChunks: { // Split all packages required from node_modules in their own file
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest' // split the webpack module resolution runtime in its own file
        }
    },
    output: { // hash file names for predictable caching
        chunkFilename: '[name].[chunkhash:4].js', 
        filename: '[name].[chunkhash:4].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // look for .scss files and apply loaders in reverse order
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // extract css in its own file
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'css-loader', // load css
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader', // autoprefix css
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader', // convert sass syntax
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    }, 
    plugins: [
        new MiniCssExtractPlugin({ // hash css for predictable caching
            filename: '[name].[contenthash:4].css',
            chunkFilename: '[name].[contenthash:4].css'
        }),
        new DuplicatePackageCheckerPlugin({ // check for duplicated packages
            verbose: true
        }),
        new BundleAnalyzerPlugin() // analyse bundle for more transparency of what goes in each bundle
    ]
};

module.exports = merge(common, prodConfig);