module.exports = {
    //开发 devServer 端口
    port: 9999,
    proxyTarget: '', // 代理地址

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
};
