module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'quotes': 'warn',
    'jsx-quotes': 'warn',
    'react/destructuring-assignment': 'warn',
    'no-useless-return': 'warn',
    'camelcase': 'warn',
    'padded-blocks': 'warn',
    'linebreak-style': 'warn',
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': 'warn',
    'comma-spacing': 'warn',
    'react/jsx-indent': 'warn',
    'no-tabs': 'warn',
    'max-len': 'warn',
    'react/self-closing-comp': 'warn',
    'no-empty': 'warn',
    'space-in-parens': 'warn',
    'comma-dangle': 'warn',
    'dot-notation': 'warn',
    'react/jsx-props-no-spreading': 'warn',
  },
};
