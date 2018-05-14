// http://eslint.org/docs/user-guide/configuring
const wordReplace = require('./config/word-replace')
const globalsWordReplace = {}
Object.keys(wordReplace).forEach(key => {
    globalsWordReplace[key] = true
})

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/ignore': {
        '^vue$': true
    },
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'indent': ['warn', 4],
    'comma-dangle': 0,
    // 'semi': ['error', 'never'],
    'semi': 0,
    'quotes': 0,
    'import/prefer-default-export': 0,
    'eqeqeq': 0,
    'no-plusplus': 0,
    'arrow-parens': 0,
    'no-param-reassign': 0,
    'import/newline-after-import': 0,
    'no-useless-concat': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'max-len': 0,
    'no-unused-expressions': 0,
    'no-mixed-operators': 0,
    'no-unused-vars': 'warn'
  },
  globals: {
    ...globalsWordReplace,
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true,
    getCurrentPages: true
  }
}
