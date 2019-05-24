const webpack = require('webpack');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { resolve } = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const createPages = require('./create-pages');

module.exports = function webpackBaseConfig (DEPLOY_ENV = 'release') {
    const config = require('../config')(DEPLOY_ENV);

    const webpackConfig = {
        target: 'web',
        entry: {
            main: resolve('src', 'main.js'),
            www: resolve('src', 'www.js')
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
                'utils': resolve('src/utils'),
                'store': resolve('src/assets'),
                'assets': resolve('src/assets'),
                'components': resolve('src/components')
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
                        limit: 8000,
                        publicPath: config.publicPath + config.imgPath,
                        outputPath: config.imgPath,
                        name: config.filenameHash ? '[name].[hash].[ext]' : '[name].[ext]?[hash]'
                    }
                },
                {
                    test: /\.(svg|ttf|eot|woff|woff2)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 8000,
                        publicPath: config.publicPath + 'fonts/',
                        outputPath: 'fonts/',
                        name: config.filenameHash ? '[name].[hash].[ext]' : '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        plugins: [
            ...createPages(),
            new webpack.DefinePlugin(Object.assign({
                'process.env.NODE_ENV': config.constants.NODE_ENV
            }, config.constants)),
            new VueLoaderPlugin(),
            new ProgressBarPlugin()
        ],
        optimization: {
            // 持久化缓存
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                chunks: 'all',
                minSize: 0,
                maxInitialRequests: Infinity,
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        name: 'vendor',
                        chunks: 'initial',
                        priority: 5,
                        enforce: true,
                        reuseExistingChunk: true
                    }
                }
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
