# 每周总结可以写在这里

 ###  课堂笔记

- 选择器语法
  1. 简单选择器
     - *
     - div            svg|a
     - .cls
     - #id
     - [attr=value]
     - :hover
     - ::before
  2. 符合选择器
     - <简单选择器><简单选择器><简单选择器>
     - *或者div必须写在最前面
  3. 复杂选择器
     - <复合选择器><sp><复合选择器>
     - <复合选择器>“>”<复合选择器>
     - <复合选择器>“~”<复合选择器>
     - <复合选择器>“+”<复合选择器>
     - <复合选择器>“||”<复合选择器>
- 选择器优先级
  1. **内联样式**，如: style="..."，权值为`1000`。
  2. **ID选择器**，如：#content，权值为`0100`。
  3. **类，伪类、属性选择器**，如.content，权值为`0010`。
  4. **类型选择器、伪元素选择器**，如div p，权值为`0001`。
  5. **通配符、子选择器、相邻选择器**等。如`* > +`，权值为`0000`。
  6. **继承**的样式没有权值
- 伪类
  - 链接/行为
    1. :any-link
    2. :link  :visited
    3. :hover
    4. :active
    5. :focus
    6. :target
  - 树结构
    1. :empty
    2. :nth-child()
    3. :nth-last-child()
    4. :first-child :last-child :only-child
  - 逻辑型
    1. :not伪类
    2. :where :has
- 伪元素
  - ::before
  - ::after
  - ::first-letter
  - ::first-line

