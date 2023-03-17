module.exports = {
  extends: [
    // ↓ESLint的内置基本规则集
    "eslint:recommended",
    // ↓Vue规则集，尚不支持Vue3 CSS变量注入功能
    "plugin:vue/vue3-recommended",
    // ↓Vue-TypeScript规则集
    "@vue/typescript/recommended",
    // ↓解决和 ESLint 的冲突
    "prettier",
    // ↓prettier规则集
    "plugin:prettier/recommended",
  ],
};
