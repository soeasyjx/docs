/*
 * @Author: jiangxin
 * @Date: 2022-09-27 16:49:12
 * @Company: orientsec.com.cn
 * @Description: 
 */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test"
        ]
      ]
    },
    "type-empty":[0],
    "type-case":[0],
    "subject-case":[0],
    "subject-full-stop":[0]
  };