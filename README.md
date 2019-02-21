# accounts-app

simple account app 
react/大猫咪的小账本

## 0. 项目总结

### 0-1. 展示

![image](https://github.com/0rainge/accounts-app/blob/master/imgDoc/demo.png?raw=true)

### 0-2. 功能点

1. 展示记录（设置表格，展示每条记录）
2. 创建记录（设置表单，输入记录：时间，事项，收支金额）
3. 计算并展示总金额（设置数据展示卡片，计算收入、支出、总金额并展示）
4. 更新/删除记录（在表单中实现数据的更新和删除）


## 1. 思路

### 1-0 搭建项目

1. 搭建脚手架：create-react-app
2. 引入样式bootstrap样式库，从bootCDN中找一个css复制link标签 https://www.bootcdn.cn/twitter-bootstrap/
3. 新建文件夹component，实现组件

### 1-1 records列表和record行记录


1. 实现Records组件，渲染一个记账表格
2. 实现Record组件，渲染一行表格内容用来存一条数据内容，通过<Record>调用数据
3. 设置Records的state，通过map传递给Record（之后会从API里取）（设置数据静态类型）

``` js
{this.state.records.map((record) => <Record record={record} / >)}
```

### 1-2 页面组件载入后的请求数据

1. 利用组件生命周期：componentDidMount
2. 通过jquery创建ajax发送请求，加载数据（通过then返回成功的结果response或失败的结果error），设置状态error和isLoaded
3. 或通过axios（基于promise的http请求库）创建ajax发送请求，（链式调用then和catch处理返回数据或捕获错误），设置状态同上
4. 根据状态（加载中、加载失败、加载成功）显示不同结果：取值、判断、返回html或{}包含的动态数据

### 1-3 设置API

1. 建立文件夹utils/RecordsAPI.js 设置API
2. 定义常量 api = process.env.NAMEE || XXXXXX
3. 导出api，在其他地方引入
4. package.json的start中设置全局变量NAMEE；或者在根目录新建文件.env.development.local
5. 定义NAMEE = API_URL
6. npm start时默认找.env.development.local等其他几个文件设置环境变量
7. 注意字符串的拼接：嵌套模版` ``${api}/records`
8. 封装axios的ajax方法（get,post,put,delete）

### 1-4 设置Record表单输入数据

1. 设置表单组件
2. render return中定义表单from，包含3个input（type，name，value，placeholder, onChange），1个btn（type），input的传入name，样式用bootstrap
3. 设置开启规则：三个表单全有值，开启按钮，通过{}传入函数动态赋值disable属性；执行方法和传入方法的区别：是否有（）
4. 监听表单内容操作state：设置onchange方法
5. event.target.name 和 event.target.value 分别代表事件发生的组件和事件发生组件内的值（event是this）

### 1-5 增加记录

- 思路：
1. 提交数据，发起请求，到API中
2. 服务器收到请求返回一个id，
3. id再加上其他数据（date，title，amount）到table组件中，重新渲染
（只要发起一条请求用来创建数据，创建完不用发送请求）做法：组件之间传递消息如form组件向table组件传递信息

- 步骤：
1. 在表单中设置监听函数
2. 绑定事件句柄
3. 在API文档中创建create方法的API：调用axios的post方法，传入body和api地址
4. 事件句柄调用api
5. 调用api后设置链式调用的then和catch，使用response和error（此处测试）
6. 子组件和父组件传递数据：实现发送数据后更新表单
7. 点击btn清空input——设置状态
8. table添加数据：通过扩展运算法，把原来的状态和传入参数混合，更新状态

### 1-6 更新记录

1. 添加编辑/更新/取消按钮（点击编辑进入编辑状态，点击更新发送请求，点击取消返回（新增状态edit进行控制）
2. 根据当前edit设置显示逻辑：从td返回不同内容（不可编辑——返回值，编辑状态——返回input，注意设置defaultValue），编辑按钮和返回按钮调用同一个函数（布尔）进行状态切换
3. 设置api发送put请求（需要传个id和需要更新的内容refs过去）
4. 更新table（仿照redux——在数组中更新元素：找到数据中那个数据，替换，返回新的数组，render更新）
5. table和record之间共享数据
6. 更新table的方法：传入的全部数据和更新过的数据，通过map更新

### 1-7 删除记录

- 思路：
1. 绑定监听函数
2. 发送请求把记录删除
3. 更新父组件

- 实现：
1. 按钮：上绑定监听函数
2. 子组件函数：在组件中设置监听函数
3. API：添加deleteAPI
4. 子组件函数：通过监听函数调用api函数
5. 父组件函数：由子组件调用——参数是子组件的，参数更新了父组件的状态，实现删除
6. 子组件：调用父组件传来的函数更新页面

### 1-7 计算金额

统计收入（正数amount相加），支出（负数amount相加），余额（收入和支出相加）

- 思路：
1. 显示卡片
2. 计算数字

- 实现：
1. 设置组件，返回html代码，传入数值
2. 父组件中设置计算函数返回给子组件


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
 
参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
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

#### 6. 父组件向字组件传递数据

通过map枚举,把值赋给另一个组件：有几条数据，调用几次组件，组件的内容通过父组件传入

子组件用this.props.record.date等来调用父组件的值



```

            {
                this.state.records.map( (record) => </Record record = {record} >)
            }
            
更复杂一点：
            {records.map((record) => (
              <Record 
              key ={record.id} 
              record = {record}  
              handleEditRecord = {this.updateRecord.bind(this)}
              handleDeleteRecord = {this.deleteRecord.bind(this)}
            />
        

```
#### 7. 扩展运算法: ...

扩展运算符用于扩展一个哈希或数组,ES6的写法

```js
1. {...record} = {id:record.id} {date:record:date}


2. 把数据混在一起：


const a = [{"a":1},{"b":2}]
const b = [{"c":3}]
const c = [...a,b]
等价于
const c = [{"a":1},{"b":2},{"c":3}]
```


#### 8. 组件分析：

组件：可以看成是一个函数/类，可以继承自Component，也可以自定义不继承

看成函数：不继承自Component，通过函数传递数据


1. 声明：扩展自Component
2. 构造器：执行父组件构造函数，设置状态state
3. 方法：自定义各种方式，实现增删改查、调接口、计算数值
4. render函数：定义变量和代码逻辑，变量可以是css样式{}，html代码()，state改变就会重新render
5. return：返回html代码
6. 导出组件：export default + 组件名（或者在定义组件时就导出）


#### 9. ES6解构赋值

```
const {err,isLoaded,records} = this.state
```

#### 10. 库的按需导入

```
import {getJson} from 'jquery'

```
到时候就直接用getJson方法

#### 11. 静态类型的检查机制

导入静态类型检查库：propTypes，设置组件的proptypes对象，key是state/porps；value是proptypes的数据类型

#### 12. 使用环境变量代替API地址

重构API变量，放入统一的文件中，把环境变量（URL）单独放入一个文件中

环境变量：‘REACT_APP_’开头，‘’

#### 13. bootstrap常用类名

外边距/内填充
1. 第一位 
- m:margin 
- p:padding
2. 第二位 
- t:top, 
- b:bottom 
- l:left 
- r:right 
- a:all 
- x:left和right
3. 第三位 
- auto:auto 
- md:1.5rem 
- lg :3rem
- 1:$spacer-x
- 2:$spacer-x * 1.5
- 3:$spacer-y * 3

还有：网格，排版，表格，表单，按钮，图片，下拉菜单，按钮组，输入框，导航栏，面包屑，分页，标签，缩略图，进度条，多媒体列表，面板等

更多常用类名参考：https://www.cnblogs.com/sunxirui00/p/7580850.html

https://v4.bootcss.com/docs/4.0/getting-started/introduction/

#### 14. 组件的监听方法：on+动作

1. 创建事件句柄:自定义方法重写形如：handleAction(event)

2. 默认监听方法形如：onAction
- onSubmit：表单提交
- onChange：input内容改变

默认监听方法onAction通常会绑定自定义方法handleAction：
```js
onAction = this.handleAction.bind(this)
```

#### 15. 阻止默认事件

```js
event.preventDefault();
```

#### 16. 发送数据的数据类型

把字符串类型转换为整形
xx:Number.parseInt(this.state.xx,0)

#### 17. 父组件向子组件传值/函数

目的：实现发送数据后更新表单的功能（当子组件form向API发出post请求后收到response，后调用父组件函数更新table，只有发送一次请求），将父组件函数传递给子组件，通过子组件调用父组件函数改变父组件状态。

1. 创建父组件方法Action
2. 把父组件方法Action赋值给子组件句柄handleAction，类似把handleChange赋值给onChange
```js
handleAction = this.Action.bind(this)

```
3. 子组件触发条件，通过this.props.handleAction调用这个函数（传入参数是子组件状态，方法内数据为父组件状态）
4. 父组件的状态得到更新

#### 18. 更新数据：获取input的内容

- 获取：使用input框的3个值，在input中设置ref属性：ref = "date/value/amount"

- 使用：在自定义方法中使用this.refs.date.value


#### 19. 关于api发送请求的疑问

向api发送数据，为什么会返回这个发送过去的数据以及id呢？

#### 20. 关于map

```js

anArray.map(aFun)：数组里的每项执行这个函数，可以用于更新数组中的某项 

例子：

updateRecord(record,data){
    // console.log(record);
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item,index) =>{
      if(index!==recordIndex){
        return item;
      }
      return{
        ...item,
        ...data
      };
    })
    this.setState({
      records: newRecords
    })
  }
```
如果是不需要改的记录就把它和更新的data放在一起，item是每一项，index是该项的索引

#### 20. 关于key

用于记录多个相同组件

```js
<Record 
              key ={record.id} 
              record = {record}  
              handleEditRecord = {this.updateRecord.bind(this)}
              handleDeleteRecord = {this.deleteRecord.bind(this)}
            />
```

#### 21. 关于filter


```js

anArray.filter(aFun) ：返回数组中满足条件的项，取出要的东西

举例1——在数组中移除元素：

const newRecords = this.state.records.filter((item,index) =>index!==recordIndex);

举例2——选出数组中所有的正数和负数：

    let credits = this.state.records.filter((record)=>{
      return record.amount<0;
    })
```

#### 22. 动态设置组件样式

传入参数bg-${type}改变样式

```js
<div className={`card-header bg-${type} text-white`} >
```
