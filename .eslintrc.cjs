module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    // extends prettier 插件會關閉 eslint 中與 prettier 衝突的規則，見：https://github.com/prettier/eslint-config-prettier
    extends: ["eslint:recommended", "plugin:vue/recommended", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {},
}
