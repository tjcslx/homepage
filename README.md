# 利用MEAN框架重构“天津市财税政务网”首页及发布页面

## 运行应用
* `git clone https://github.com/tjcslx/homepage.git`或解压文件；
* 运行`npm install`或`yarn`命令安装依赖；
* 在MySQL中建立tjcsnews数据库，运行public/sql/tjcsnews.sql生成数据；
* 运行`npm start`命令启动应用，访问[首页](http://localhost:3000)及[发布页面](http://localhost:3000/backend)。
## 已完成的功能及利用的技术、框架
* 前端为HTML+CSS+JS，其中CSS用Less预处理器构建，使用了BEM方法进行分层；动画及DOM操作使用了jQuery库，JS通过RequireJS库部分实现了模块化。
* 后端为NodeJS的Express框架，模板引擎为Jade，利用router创建API供前端调用。
* 数据库为MySQL，通过mysql-activerecord包与NodeJS连接。
* 前端页面用AngularJS框架进行呈现。
* 数据可视化部分通过百度ECharts来实现。
* 后端通过AngularJS实现了添加和删除新闻的功能。
## 未完成的功能
* 使用前端工程化工具进行构建。
* 登录功能及相关的安全加固。
* 数据可视化未与后端API相结合。
* 未实现新闻修改，以及添加新闻时判断是否为空的功能。
## 存在的问题
* 首页jQuery动画某些时候需要刷新页面才能生效。
* 后端功能中，点击新闻链接，通过API获得的信息未能加载到页面上。
* 后端功能中，点击“添加”按钮，新建页面中“新闻版块”多出一条空白的选项，内容为：
`<option value="? undefined:undefined ?"></option>`。