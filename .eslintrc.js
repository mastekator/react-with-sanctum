// http://eslint.org/docs/user-guide/configuring
module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module'
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true
    },
    'rules': {
        'max-len': [
            'error',
            120,
            4,
            {
                'ignoreTrailingComments': true,
                'ignoreComments': true,
                'code': 120,
                'ignoreUrls': true,
                'ignoreTemplateLiterals': true,
                'ignoreStrings': true,
                'ignoreRegExpLiterals': true
            }
        ],
        'semi': 'off',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'indent': 'off',
        'require-jsdoc': 'off',
        'operator-linebreak': 'off',
        'valid-jsdoc': 'off',
        'space-before-function-paren': 'off',
        'react/prop-types': 'off',
        'linebreak-style': 'off'
    },
    'plugins': [
        'react'
    ],
    'globals': {
        'JSX': 'readonly'
    },
    'ignorePatterns': [
        'resources/js/components/UI/iconComponents/*.tsx',
        'node_modules',
        'vendor',
        'public',
        'docker',
        'webpack.mix.js',
        'webpack.css.js'
    ],
    'extends': [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'google'
    ]
}
