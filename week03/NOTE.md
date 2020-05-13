<<<<<<< HEAD
# 每周总结可以写在这里

按照 ECMAScript 标准，一些 特定语句（statement) 必须以分号结尾。分号代表这段语句的终止。但是有时候为了方便，这些分号是有可以省略的。这种情况下解释器会自己判断语句该在哪里终止。这种行为被叫做 “自动插入分号”，简称 ASI (Automatic Semicolon Insertion) 。实际上分号并没有真的被插入，这只是个便于解释的形象说法。



简单语句中  3个产生的是normal其余的是非normal

在块语句中，遇到非normal语句，后面的就不运行了





forEach跳不出来的时候可以用throw new Error



了解关于构造函数function*，以及yield和next()



了解同步和异步    了解下promise+setTimeout（之前有说过）

```javascript
function sleep(d){
	return new Promise(reslover => setTimeout(reslover,d))
}
void async function(){
	var i = 0
	while(true){
		console.log(i++)
		await sleep(1000)
	}
}
```



for await？



promise      async、await





let const   到底有没有变量声明，叫暂时性死区



淳元 



mimix
=======
# 每周总结可以写在这里

###  学习笔记

JavaScript：

- Atom
- Expression
- Statement
- Structure
- Program/Module



###  对象

三大特征：状态、行为、唯一性

面向对象的主流：Object-Class：基于类的面向对象

程序员做的事：先进行有效抽象  在用抽象的语言去描述



###  首先是关于js标准中所有特殊的对象的一个总结

没有很好理解老师说的特殊是指哪些对象，应该是除了普通对象之外的所有对象，这里总结一下在EMCAScript标准里面找到的对象按照标准中的分类整理下。对于老师说的无法实现的对象还是有点不理解，不理解什么是不能实现的对象。

![Object](D:\张未\个人\Frontend-01-Template\week03\image\Object.png)

再整理了熟知的一些对象（标准6.1.7.4）

![Well-Known Intrinsic Object](D:\张未\个人\Frontend-01-Template\week03\image\Well-Known Intrinsic Object.png)

这里面只是按照标准整理了这些对象，但是里面除了常用的对象外，还有大部分不知道作用。需要在后面陆续查资料了解补齐这个导图。后来发现后面还有好多。



>>>>>>> 24c3bea118c954976c46c92b65d269510fdaa426
