import base from '../index.js';

export default {
  ...base,
  extends: [
    ...base.extends,
    "stylelint-config-styled-components",
  ],
};
