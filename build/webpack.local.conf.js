const merge = require('webpack-merge');

const { resolve } = require('./utils');

const DEPLOY_ENV = 'local';
const config = require('../config')(DEPLOY_ENV);
const webpackBaseConfig = require('./webpack.base.conf')(DEPLOY_ENV);

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
                test: /\.(scss|sass|css)$/,
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
                        scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader'
                    }
                }
            }
        ]
    },
    plugins: [
    ],
    devServer: {
        inline: true,
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: config.port,
        historyApiFallback: true,
        disableHostCheck: true,
        open: true,
        proxy: config.proxy
    }
});

module.exports = webpackConfig;
