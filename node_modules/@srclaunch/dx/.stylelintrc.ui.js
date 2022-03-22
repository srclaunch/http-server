const base = require('../index');

module.exports = {
  ...base,
  extends: [
    ...base.extends,
    "stylelint-config-styled-components",
  ],
};
