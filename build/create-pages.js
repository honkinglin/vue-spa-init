const Htmlplugin = require('html-webpack-plugin');
const { resolve } = require('./utils');

module.exports = function createPages() {
    return [
        new Htmlplugin({
            template: resolve('public/index.html'),
            filename: 'index.html',
            favicon: resolve('public/favicon.ico'),
            minify: {
                removeComments: true
            },
            excludeChunks: ['www']
        }),
        new Htmlplugin({
            template: resolve('public/error.html'),
            filename: 'error.html',
            favicon: resolve('public/favicon.ico'),
            minify: {
                removeComments: true
            },
            chunks: []
        }),
        new Htmlplugin({
            template: resolve('public/www.html'),
            filename: 'www.html',
            favicon: resolve('public/favicon.ico'),
            minify: {
                removeComments: true
            },
            excludeChunks: ['main']
        })
    ];
};
