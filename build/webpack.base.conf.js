const webpack = require('webpack');

const Htmlplugin = require('html-webpack-plugin');

const { resolve } = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = function webpackBaseConfig (DEPLOY_ENV = 'release') {
    const config = require('../config')(DEPLOY_ENV);

    const webpackConfig = {
        entry: {
            app: resolve('src', 'main.js')
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src')
            }
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(jpe?g|png|gif|webp)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: config.publicPath,
                        outputPath: config.imgPath,
                        useRelativePath: false,
                        name: config.filenameHash ? '[name].[hash].[ext]' : '[name].[ext]?[hash]'
                    }
                },
                {
                    test: /\.(svg|ttf|eot|woff|woff2)$/,
                    loader: 'url-loader',
                    exclude: [
                        resolve('src', 'components', 'svg', 'icons')
                    ],
                    query: {
                        limit: 10000,
                        publicPath: config.publicPath,
                        outputPath: 'fonts/',
                        useRelativePath: false,
                        name: config.filenameHash ? '[name].[hash].[ext]' : '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        plugins: [
            new Htmlplugin({
                template: resolve('index.html'),
                filename: 'index.html',
                inject: 'body',
                minify: {
                    removeComments: true
                }
            }),
            new webpack.DefinePlugin(Object.assign({
                'process.env.NODE_ENV': config.constants.NODE_ENV
            }, config.constants)),
            new VueLoaderPlugin()
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0 // This is example is too small to create commons chunks
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: {
                name: 'runtime'
            }
        }
    };

    if (config.eslint) {
        webpackConfig.module.rules.push({
            test: /\.(js|vue)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader'
        });
    }

    return webpackConfig;
};
