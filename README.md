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

1. vs code react如何自动补全标签
https://blog.csdn.net/shaleilei/article/details/82984228

2. chrome安装react调试插件
https://github.com/facebook/react-devtools/blob/master/README.md#the-react-tab-doesnt-show-up
