# 每周总结可以写在这里

上课笔记

- 结构化程序设计的基础设施

  - JS执行粒度

    - JS Context (上下文)  =>  Realm

      1.多个宏任务之间共享一个全局变量

      2.Realm：

    - 宏任务

    - 微任务（Promise）

    - 函数调用

      1.栈     栈顶元素：Running Execution Context

      2.Execution Context:  code evaluation state;Function;Script or Module; Generator;Realm;LexicalEnvironment(词法环境);VariableEnvironment(变量环境)

      3.LexicalEnvironment:this   |  new.target  | super  | 变量

      4.VariableEnvironment

      5.Environment Record  :Declarative ~  : Function~  ;  module~ |

      6.Realm:相当于一类对象的集合

    - 语句/声明

    - 表达式

    - 直接量/变量/this

  