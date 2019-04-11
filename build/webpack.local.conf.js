const merge = require('webpack-merge');

const { resolve } = require('./utils');

const config = require('../config/local');
const webpackBaseConfig = require('./webpack.base.conf')('local');

const filenameHash = config.filenameHash;

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
    output: {
        filename: filenameHash ? `${config.jsPath}[name].[hash].js` : `${config.jsPath}[name].js?[hash]`,
        path: resolve('dist'),
        publicPath: config.publicPath,
        chunkFilename: filenameHash ? `${config.jsPath}[name].[hash].js` : `${config.jsPath}[name].js?[hash]` // for the require.ensure
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?sourceMap' },
                    { loader: 'postcss-loader?sourceMap' },
                    { loader: 'sass-loader?sourceMap' }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules)/,
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }
        ]
    },
    plugins: [
    ],
    devServer: {
        compress: true,
        host: '0.0.0.0',
        port: config.port,
        historyApiFallback: true,
        disableHostCheck: true,
        open: true,
        proxy: {}
    }
});

module.exports = webpackConfig;
