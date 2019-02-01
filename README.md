# accounts-app

simple account app 
react/大猫咪的小账本

## 1. records 列表页

1. 搭建脚手架：create-react-app
2. 引入样式bootstrap样式库，从bootCDN中找一个css复制link标签 https://www.bootcdn.cn/twitter-bootstrap/
3. 新建文件夹component，实现组件
4. 实现Records组件，渲染一个记账表格
5. 实现Record组件，渲染一个tr用来存数据，通过<Record>调用数据
6. 设置Records的state，通过map传递给Record（之后会从API里取）

``` js
{this.state.records.map((record) => <Record record={record} / >)}
```

## 问题记录：

#### 1. vs code react如何自动补全标签
https://blog.csdn.net/shaleilei/article/details/82984228

#### 2. chrome安装react调试插件
https://github.com/facebook/react-devtools/blob/master/README.md#the-react-tab-doesnt-show-up

#### 3. 报错

```s
index.js:1446 Warning: Each child in an array or iterator should have a unique "key" prop.


key应该放在Records里面，而不是Record中


<tr key ={this.props.record.id}> 改成 <Record key ={record.id} record={record} / >

```

#### 4. mock模拟服务器端数据

1. 通过API创建数据 https://www.mockapi.io/
2.  json server：https://github.com/typicode/json-server

```s

1. 项目根目录创建一个json


2. Yo:accounts-app 0range$ json-server --watch db.json --port 3004

  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3004/records

  Home
  http://localhost:3004


```

#### 5. mock模拟收到数据

1. 在终端进行curl

```s
curl http://5c544a2ea659410014eeeb2c.mockapi.io/api/v1/records 

 [{"id":"1","date":"2019-02-01","title":"title 1","amount":91},{"id":"2","date":"2019-02-01","title":"title 2","amount":73},{"id":"3","date":"2019-02-01","title":"title 3","amount":71},{"id":"4","date":"2019-02-01","title":"title 4","amount":16}]Yo:accounts-app 

```

2. postman使用get方法

![image](https://github.com/0rainge/accounts-app/blob/master/imgDoc/getM.png?raw=true)

3. 浏览器自带fetch方法
 
```s
fetch('http://localhost:3004/records ')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });

分析这个函数：接url接then函数返回一个promise,后面跟一个json，最后输出

只有当网络故障或请求阻止才会被标记为reject
```

#### 5. mock模拟发送数据

1. 向远程API发送数据
![image](https://github.com/0rainge/accounts-app/blob/master/imgDoc/postR.png?raw=true)

2. 向本地json server发送数据
![image](https://github.com/0rainge/accounts-app/blob/master/imgDoc/postL.png?raw=true)
