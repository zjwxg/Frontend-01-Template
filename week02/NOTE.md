# 每周总结可以写在这里

##  关于第二周学习的总结

###  主题：编程语言通识与JavaScript语言设计（词法，类型）

心得小记：果然课程比较深，无法反驳老师关于因为是重学，所以到了解漏掉的知识这一说法。但奈何太过深，必须一边一边反复看，以及多查资料。上课全称懵的状态，自己的js基础知识水平还不够哇，又要补课了。

####   学习笔记

#####  一、编程语言通识

#####  语言按语法分类

- 非形式语言

  - 中文，英文

- 形式语言（[乔姆斯基谱系](https://zh.wikipedia.org/wiki/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E8%B0%B1%E7%B3%BB)）

  - 0型	无限制文法或短语结构文法，包括所有的文法。该类型的文法能够产生所有可被图灵机识别的语言（能够是图灵机停机的字符串，又称为递归**可枚举**语言）。
  
    ?::=?
  
  - 1型    （上下文相关文法）生成上下文相关语言。这种文法规定的语言可被现行有界非确定图灵机接受。

    ?<A>?::=?<B>?
  
  - 2型    （上下文无关文法）生成上下文无关语言。这种文法规定的语言可以被非确定下推自动机接受。上写文无关语言为大多数程序设计语言的语法以供了理论基础。
  
  - <A>::=?
  
  - 3型    （正则文法）生成正则语言。这种语言可以被有限状态自动机接受，也可以通过正则表达式来获取。正则语言通常用来定义检索模式或者程序设计语言中的词法结构。
  
    <A>::=<A>?
  
    <A>::=?<A>     错
  
  [^乔姆斯基谱系]: 是计算机科学中刻画形式文法表达能力的一个分类谱系，是有诺姆·乔姆斯基于1956年提出的。
  [^终结符与非终结符]: [wiki](https://zh.wikipedia.org/wiki/%E7%B5%82%E7%B5%90%E7%AC%A6%E8%88%87%E9%9D%9E%E7%B5%82%E7%B5%90%E7%AC%A6) 终结符和非终结符在计算机科学和语言学的领域是用来指定推到规则的元素。在某个形式语法之中，终结符和非终结符是两个不交的集合。
  [^终结符]: 终结符是一个形式语言的基本符号。就是说，他们能在一个形式语法的推到规则的输入或输出字符串存在，而且他们不能被分解成更小的单位。确切的说，一个语法的规则不能改变终结符。
  [^非终结符]: 非终结符是可以被取代的符号。一个形式文法中必须有一个起始符号；这个起始符号属于非终结符的集合。   

#####  产生式(BNF:Backus Normal Form):[wiki](https://zh.wikipedia.org/zh-hans/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)

简介：BNF规定是**推导规则**（产生式）的集合，写为： <符号> ::= <使用符号的表达式>（这里的<符号>是非终结符，而表达式由一个符号序列，或用只是选择的竖杠‘|’分割的过个符号序列构成，每个符号序列整体都是左端的符号的一种可能的代替。从未在左端出现的符号叫做终结符）

BNF凡是的语法：在BNF中，双引号中的子["world"]代表这些字符本省。而double_quote用来代表双引号。

在双引号外的字（有可能有下划线）代表着语法。

| 符号  | 语法                          |
| ----- | :---------------------------- |
| < >   | 内包含的为必选项              |
| [ ]   | 内包含的为可选项              |
| { }   | 内包含的为克重复0至无数次的项 |
| ::=   | 是“被定义为”的意思            |
| "..." | 术语符号                      |
| [...] | 选项，最多出现一次            |
| {...} | 重复项，任意次数，包括0次     |
| (...) | 分组                          |
| \|    | 并列选项，只能选一个          |

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的符合结构
  - 基础结构称终结符
  - 符合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- *表示重复多次
- |表示或
- +表示至少一次

```
练习：
定义终结符："a"
定义终结符："b"
<Program>:= "a"+ | "b"+
<Program>:= <Program> "a"+ | <Program> "b"+

定义十进制
<Number> = "0" | "1" | "2" | ...... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ...... | "9") <Number>*)

定义加法
<Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>

案例：四则运算
	1 + 2 * 3
	终结符:
	Number    +-*/
	非终结符
	MultiplicativeExpression
	AddtiveExpression
	<Number> = "0" | "1" | "2" | ...... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ...... | "9") <Number>*)
<AddExpression> = <DecimalNumber> | <AddExpression> "+" <DecimalNumber>

变
<MultiplicativeExpression> = <DecimalNumber> | 
							<MultiplicativeExpression> "*" <DecimalNumber> |
							<MultiplicativeExpression> "/" <DecimalNumber>
变
<AddExpression> = <MultiplicativeExpression> | 
					<AddExpression> "+" <MultiplicativeExpression> |
					<AddExpression> "-" <MultiplicativeExpression>

<MultiplicativeExpression> = <MultiplicativeExpression> | <AddExpression> "+" <MultiplicativeExpression>
变
<LogicalExpression> = <AddExpression> | 
					<LogicalExpression> "||" <AddExpression>  |
                    <LogicalExpression>  "&&" <AddExpression>
                    
带括号
<PrimaryExpression> = <DecimalNumber> | 
						"(" <LogicalExpression> ")" 
						  -------语法分析
						
						
用正则来写：
<DecimalNumber> = /0|[1-9][0-9]*/   ---词法分析



```

#####  其他产生式

EBNF  ABNF  Customized

```
AdditiveExpression:
	MultiplicativeExpression
	AdditiveExpression +(加粗) MultiplicativeExpression
	AdditiveExpression -(加粗) MultiplicativeExpression

所有终结符为加粗
```

