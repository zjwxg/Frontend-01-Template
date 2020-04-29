没有弄出来......

- StringToNumber

```javascript
function StringToNumber(string, x) {
        if(arguments.length <= 1){
            x = 10
        }
        //先拆成一个数组
        var chars = string.split('')
        console.log(chars)
        var number = 0
        //遍历string
        var i =0
        //处理整数部分
        while(i < chars.length && chars[i] != '.'){
            number = number * x
            console.log(number)
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)
            i++
        }
        if(chars[i] === '.'){
            i ++
        }
        var fraction = 1
        while(i < chars.length){
            fraction = fraction / x
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
            i++
        }

        console.log(number)
        return number
    }
    
    StringToNumber("123.45")
```

- NumberToString

```javascript
 function convertNumberToString(number, x) {
        var integer = Math.floor(number)
        var fraction = number - integer  //小数部分
        var string = ''
        while(integer > 0){
            console.log(integer)
            string = String(integer % x) + string //得到整数部分最后一位
            integer =  Math.floor(integer / x)
            console.log(integer)
        }

        console.log(string)

        // 完善小数部分
        return string
    }

    convertNumberToString(11,10)
```

