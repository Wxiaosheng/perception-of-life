在了解 husky 之前，我们首先来看看，什么是 githooks

### githooks
如同其他许多的版本控制系统一样，Git 也具有在特定事件发生之前或之后执行特定脚本代码功能。  

Git Hooks 就是那些在Git执行特定事件（如commit、push、receive等）后触发运行的脚本，挂钩是可以放置在挂钩目录中的程序，可在git执行的某些点触发动作。

#### git hooks 能做什么
Git Hooks是定制化的脚本程序，所以它实现的功能与相应的git动作相关，如下几个简单例子：
1. 多人开发代码语法、规范强制统一
2. commit message 格式化、是否符合某种规范
3. 如果有需要，测试用例的检测
4. 服务器代码有新的更新的时候通知所有开发成员
5. 代码提交后的项目自动打包（git receive之后） 等等...

更多的功能可以按照生产环境的需求写出来

#### git hooks 是如何工作的
每一个使用了 git 的工程下面都有一个隐藏的 .git 文件夹。  

挂钩都被存储在 .git 目录下的 hooks 子目录中，即大部分项目中的 .git/hooks。

Git 默认会放置一些脚本样本在这个目录中，除了可以作为挂钩使用，这些样本本身是可以独立使用的。


### husky
husky 是一个 Git Hook 工具。husky 其实就是一个为 git 客户端增加 hook 的工具。

#### 安装
```
  yarn add husky -D
```

#### 配置
1. package.json 的 script 中 新增 ESLint 校验脚本，如  
`"eslint": "eslint --ext .js --ext .jsx --ext .tsx ./src/"`

2. 在 package.json 中 新增 husky 选项
```
  "husky": {
    "hooks": {
      "pre-commit": "yarn run eslint"
    }
  }
```

!> 此时，在你 git commit 的时候，如果 eslint  校验不通过时，则无法 commit 成功

!> **如果是新启动的项目，完全可以只使用 husky 来校验提交的代码，可以不需要与 lint-staged 搭配使用**

### lint-staged
#### lint 是什么？
简单来说，Lint 就是对代码做静态分析，并试图找出潜在问题的工具。  

在很多情况下在持续集成阶段（后文用 CI 代称）做 Lint，比如使用远程的 Git Hooks 来触发。但是从实际的经历来看，整个过程可能会浪费掉你不少时间。  

也就是提交后 Lint，反馈链条太长。

#### 怎么改进
为了缩短 Lint 的反馈链条，把 Lint 挪到本地是最有效的办法。常见做法是使用 husky 或者 pre-commit 在本地提交之前做 Lint。

通常情况下，我们开启 lint 是在现有项目中开启，这时你可能会面临成千上万的 Lint Error 需要修复，这并不是我们想看到的。  

我们希望的是在项目中运用新工具都希望是渐进式的，而不是推到重来式的，因为相比而言，业务系统稳定是更重要的事情。  

**如果把 Lint 挪到本地，并且每次提交只检查本次提交所修改的文件，上面的痛点就都解决了。**

而 lint-staged 就是基于这个想法，其中 staged 是 Git 里面的概念，指待提交区，使用 git commit -a，或者先 git add 然后 git commit 的时候，你的修改代码都会经过待提交区。

#### 安装
```
  yarn add lint-staged -D
```

#### 配置
```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,mjs,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "src/**/*.{css,scss,less,json,html,md,markdown}": [
      "prettier --write"
    ]
  }
```

此时，就实现了在 commit 代码时，自动格式化代码 和 校验代码格式了。

