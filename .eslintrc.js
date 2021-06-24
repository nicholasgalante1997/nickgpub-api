module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            globalReturn: false,
        },
        babelOptions: {
            configFile: './.babelrc',
        },
    },
    rules: {
        'prettier/prettier': 'error',
    },
}
