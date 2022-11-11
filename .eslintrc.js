module.exports = {
  extends: ['react-app', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/consistent-type-assertions': 0,
    'react/button-has-type': [2, { submit: false, reset: false }],
  },
};
