const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { resolve } = require('./utils');

const DEPLOY_ENV = process.env.DEPLOY_ENV || 'master';

const config = require('../config')(DEPLOY_ENV);
const webpackBaseConfig = require('./webpack.base.conf')(DEPLOY_ENV);

const filenameHash = config.filenameHash;

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        filename: filenameHash ? `${config.jsPath}[name].[chunkhash].js` : `${config.jsPath}[name].js?[chunkhash]`,
        path: resolve('dist'),
        chunkFilename: filenameHash ? `${config.jsPath}[name].[chunkhash].js` : `${config.jsPath}[name].js?[chunkhash]`, // for the require.ensure
        publicPath: config.publicPath
    },
    stats: {
        children: false
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1000000, // 500kib
        maxAssetSize: 1000000
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: config.publicPath
                        }
                    },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules)/,
                options: {
                    loaders: {
                        scss: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                        sass: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: filenameHash ? `${config.cssPath}[name].[contenthash].css` : `${config.cssPath}[name].css?[contenthash]`
        }),
        new OptimizeCSSAssetsPlugin()
    ]
});

module.exports = webpackConfig;
