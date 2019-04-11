// https://eslint.org/docs/user-guide/configuring

module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 通用空格一致
        'comma-spacing': 0,
        //方法前空格允许
        'space-before-function-paren': 0,
        // 限制使用单引号,
        'quotes': 0,
        //不允许行尾有空格
        'no-trailing-spaces': 0,

        'no-unused-vars': 0,
        // 关闭语句强制分号结尾
        'semi': [2, 'always'],
        //空行最多不能超过100行
        'no-multiple-empty-lines': [0, {
            'max': 100
        }],
        //关闭禁止混用tab和空格
        'no-mixed-spaces-and-tabs': [0],
        'no-tabs': 0,
        'indent': ['error', 4],
        //'indent': 0,
        //注释空格
        'spaced-comment': 0,
        //判断无等号
        'padded-blocks': 0,
        'no-useless-escape': 0,
    }
}
