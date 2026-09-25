const globals = require("globals");

module.exports = [
    {
        ignores: ["node_modules/**", "coverage/**"],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: { ...globals.node, ...globals.jest },
        },
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "no-undef": "error",
            "no-unreachable": "error",
            "no-console": "off",
        },
    },
];
