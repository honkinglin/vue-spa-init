module.exports = {
    constants: {
        NODE_ENV: JSON.stringify('production'),
        DEPLOY_ENV: JSON.stringify('master'),
        API_ORIGIN: JSON.stringify('')
    },

    sourceMap: false,
    devtool: false, //or source-map
    eslint: false,
    //静态资源cdn地址
    publicPath: '/',
    //类型静态资源访问路径
    jsPath: 'js/',
    cssPath: 'css/',
    imgPath: 'images/',
    //生成带hash文件名
    filenameHash: true
};
