module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": 2,
    // 空的构造函数
    "no-useless-constructor": 0,
    // 是否允许使用控制台输出
    "no-console": 0,
    //未使用变量
    "no-unused-vars": 1,
    // 变量前加修饰符  var let const 等
    "no-undef": 1,
    //避免重复类成员
    "no-dupe-class-members": 2,
    // 禁止重复导入
    "no-duplicate-imports": 2,
    // 禁止链式定义 let a = b = c = 1
    "no-multi-assign": 1,
    // 禁止使用 自增、自减
    "no-plusplus": 1,
    // 判断是否相等用 === 或 !==
    "eqeqeq": 1,
    // 三目运算符 单行
    "no-nested-ternary": 1,
    // 所有注释开头空一个
    "spaced-comment": 1,
    // 用空格来隔开运算符
    "space-infix-ops": 1,
    // 花括号里加空格
    "object-curly-spacing": 1,
    // , 前不要空格， , 后需要空格
    "comma-spacing": 1,
    // "sort-imports": 1,
  }
};
