const path = require('path');
const merge = require('webpack-merge');

module.exports = function config (DEOLOY_ENV = 'dev') {
    return merge({}, require(path.join(__dirname, DEOLOY_ENV)));
}
