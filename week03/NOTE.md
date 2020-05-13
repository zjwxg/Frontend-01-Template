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