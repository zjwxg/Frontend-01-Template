const net = require('net')
const parser = require("./parser.js")

class Request {
    //method, url = host + port + path
    //body: k/v
    //headers
    constructor(option) {
        this.method = option.method || 'GET'
        this.host = option.host
        this.port = option.port || 80
        this.path = option.path || "/"
        this.body = option.body || {}
        this.headers = option.headers || {}
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form/urlencoded"
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers["Content-Type"] === "application/x-www-form/urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                parser.receive(data.toString())
                // resolve(data.toString());
                if(parser.isFinished){
                    resolve(parser.response)
                }
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err)
                connection.end()
            })
        })
    }
}

class ResponseParser {
    //定义状态
    constructor() {
        //规定状态
        this.WAITING_STATUS_LINE = 0 //响应的第一行的状态
        this.WAITING_STATUS_LINE_END = 1 //接受到\r之后会有个WAITING_STATUS_LINE_END的事件
        this.WAITING_HEADER_NAME = 2 //如果header name后面有：的话会进入value的状态
        this.WAITING_HEADER_VALUE = 3 //value也是以\r结束的
        this.WAITING_HEADER_SPACE = 4 //HEADER name后面之后还有个空格
        this.WAITING_HEADER_LINE_END = 5
        this.WAITING_HEADER_BLOCK_END = 6 //如果在都header name的时候第一个就遇到了\r那么就会进入WAITING_HEADER_BLOCK_END
        this.WAITING_BODY = 7

        this.current = this.WAITING_STATUS_LINE //当前状态，设定为第一个状态
        this.statusLine = '' //储存响应的第一行信息
        this.headers = {}
        this.headerName = ""
        this.headerValue = ""
        this.bodyParser = null //在解析完header后创建  根据Transfer-Encoding创建
        //Transfer-Encoding 消息首部指明了将 entity 安全传递给用户所采用的编码形式。
        //Transfer-Encoding是一个逐跳传输消息首部，即仅应用于两个节点之间的消息传递，而不是所请求的资源本身
        //数据以一系列分块的形式进行发送。 Content-Length 首部在这种情况下不被发送。。在每一个分块的开头需要
        /**chunked：添加当前分块的长度，以十六进制的形式表示，后面紧跟着 '\r\n' ，之后是分块本身，后面也是'\r\n' 。终止块
        是一个常规的分块，不同之处在于其长度为0。终止块后面是一个挂载（trailer），由一系列（或者为空）的实体消息首部构成。**/
    }

    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished
    }

    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
        return {
            statusCode: RegExp.$1,
            statusText:  RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }



    //字符流的处理
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char) {
        switch (this.current) {
            case this.WAITING_STATUS_LINE:
                if (char === '\r') {
                    this.current = this.WAITING_HEADER_LINE_END
                } else if (char === '\n') {
                    this.current = this.WAITING_HEADER_NAME
                } else {
                    this.statusLine += char
                }
                break;
            case this.WAITING_HEADER_LINE_END:
                if (char === '\n') {
                    this.current = this.WAITING_HEADER_NAME
                }
                break;
            case this.WAITING_HEADER_NAME:
                //HEADER_NAME是以冒号结束的
                if (char === ':') {
                    //HEADER_NAME:之后还有个空格
                    this.current = this.WAITING_HEADER_SPACE
                    //在这个状态中吃掉一个\n，否正bodyParser会多一个回车
                } else if (char === '\r') {
                    //结束多个header的循环
                    this.current = this.WAITING_HEADER_BLOCK_END
                    //header创建完之后才之后Transfer-Encoding是什么，该处写死,
                    //根据Transfer-Encoding的值来判断用什么parser来处理body
                    if (this.headers['Transfer-Encoding'] === 'chunked') {
                        this.bodyParser = new TrunkedBodyParser()
                    }
                } else {
                    this.headerName += char
                }
                break;
            case this.WAITING_HEADER_SPACE:
                if (char === ' ') {
                    this.current = this.WAITING_HEADER_Value
                }
                break;
            case this.WAITING_HEADER_Value:
                if (char === '\r') {
                    this.current = this.WAITING_HEADER_LINE_END
                    //由于header是有多行的把headername和headervalue存到header中
                    this.headers[this.headerName] = this.headerValue
                    //完成一行之后情调当前的headerName和headerValue
                    this.headerName = ''
                    this.headerValue = ''

                } else {
                    this.headerValue += char
                }
                break;
            case this.WAITING_HEADER_LINE_END:
                if (char === '\n') {
                    this.current = this.WAITING_HEADER_NAME
                }
                break
            case this.WAITING_HEADER_BLOCK_END:
                if (char === '\n') {
                    this.current = this.WAITING_BODY
                }
                break
            case this.WAITING_BODY:
                //转发给TrunkedBodyParser
                this.bodyParser.receiveChar(char)
                break


        }
    }
}

class TrunkedBodyParser {
    //定义状态
    constructor() {
        this.WAITING_LENGTH = 0   //十进制的length
        this.WAITING_LENGTH_LINE_END = 1
        this.READING_TRUNK = 2
        this.WAITING_NEW_LINE = 3
        this.WAITING_NEW_LINE_END = 4
        this.length = 0  //READING_TRUNK的计数器
        this.content = []
        this.isFinished = false

        this.current = this.WAITING_LENGTH
    }

    //字符流的处理
    receiveChar(char) {
        switch (this.current) {
            case this.WAITING_LENGTH:
                //读长度
                if(char === '\r'){
                    //是以0结尾的
                    if(this.length === 0){
                        this.isFinished = true
                    }
                    this.current = this.WAITING_LENGTH_LINE_END
                }else{
                    this.length *= 16
                    this.length += parseInt(char,16)
                }
                break;
            case this.WAITING_LENGTH_LINE_END:
                if(char === '\n'){
                    this.current = this.READING_TRUNK
                }
            break;
            case this.READING_TRUNK:
                this.content.push(char)
                this.length --
                if(this.length === 0){
                    this.current = this.WAITING_NEW_LINE
                }
            break;
            case this.WAITING_NEW_LINE:
                if(char === '\r'){
                    this.current = this.WAITING_NEW_LINE_END
                }
            break;
            case this.WAITING_NEW_LINE_END:
                if(char === '\n'){
                    this.current = this.WAITING_LENGTH
                }
            break;
        }
    }
}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });
    let response = await request.send();  //此处是等得到所有的responend，在把整个body传给parser，实际过程不是这样的

    let dom = parser.parseHTML(response.body)

}()


// const client = net.createConnection({
//     host: "127.0.0.1",
//     port: 8088
// }, () => {
//     // 'connect' listener.
//     console.log('connected to server!');
//     client.write("POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n\r\nname=winter")
//     let request = new Request({
//         method: "POST",
//         host: "127.0.0.1",
//         port: "8088",
//         path: "/",
//         headers:{
//             ["X-Foo2"]:"customed"
//         },
//         body: {
//             name: "winter"
//         }
//     })

//     console.log(request.toString())
//     client.write(request.toString())



// });
// client.on('data', (data) => {
//     console.log(data.toString());
//     client.end();
// });
// client.on('end', () => {
//     console.log('disconnected from server');
// });

// client.on('error', (err) => {
//     console.log(err)
//     client.end()
// })