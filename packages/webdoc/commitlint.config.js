/*
 * @Author: jiangxin
 * @Date: 2022-09-14 15:40:53
 * @Company: orientsec.com.cn
 * @Description: 
 */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // 必须以下中的类型之一
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
  };

//   feat(create): 提交内容