module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-prettier"],
  plugins: ["stylelint-order"],
  rules: {
    "block-opening-brace-newline-before": "always-single-line",
    "comment-empty-line-before": [
      "always",
      {
        ignore: ["stylelint-commands", "after-comment"],
      },
    ],
    "declaration-empty-line-before": "never",
    "function-whitespace-after": "always",
    "length-zero-no-unit": true,
    "max-empty-lines": 1,
  },
};
