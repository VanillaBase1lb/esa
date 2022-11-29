module.exports = exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
  },

  "parserOptions": {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  ecmaFeatures: {
    // env=es6 doesn't include modules, which we are using
    modules: true,
  },

  extends: "eslint:recommended",
};
