const path = require('path');
const merge = require('webpack-merge');

module.exports = function config (DEOLOY_ENV = 'master') {
    return merge({
        //静态资源cdn地址
        publicPath: '',
        //类型静态资源访问路径
        jsPath: 'js/',
        cssPath: 'css/',
        imgPath: 'images/'
    }, require(path.join(__dirname, DEOLOY_ENV)));
};
