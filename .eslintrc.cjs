const base = require('@srclaunch/dx/.eslintrc');

module.exports = {
  ...base,
  overrides: [
    {
      rules: {
        'functional/prefer-readonly-type': 'off',
      },
    },
  ],
};
