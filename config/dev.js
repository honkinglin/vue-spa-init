module.exports = {
    constants: {
        NODE_ENV: JSON.stringify('production'),
        DEPLOY_ENV: JSON.stringify('dev'),
        API_ORIGIN: JSON.stringify('')
    },

    sourceMap: false,
    devtool: false, //or source-map
    eslint: false,
    //生成带hash文件名
    filenameHash: true
};
