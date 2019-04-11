const merge = require('webpack-merge');
const master = require('./master');

module.exports = merge(master, {
    //开发 devServer 端口
    port: 9999,

    constants: {
        NODE_ENV: JSON.stringify('development'),
        DEPLOY_ENV: JSON.stringify('local'),
        API_ORIGIN: JSON.stringify('')
    },
    //sourceMap开发环境强制开启
    // sourceMap: true,
    devtool: 'source-map',
    eslint: true,
    //生成带hash文件名
    filenameHash: false
});
