# rebuildAuction
这是一个重新创建的有关于Auction即在线的竞拍程序
一。 README.md的文件的作用
1. 组件包括：装饰器(@Component),模板，控制器(包含属性和方法)
2. 装饰器里的属性(selector,styleUrl, templateUrl等)就被成为元数据。
3. app.module.ts中declarations:[]里面只可以注入组件，指令，管道。imports本模块引入其他的模块, BrowserModule:浏览器模块，providers:[]本模块提供的服务, bootstrap表示的是启动的主组件。
4. .angular-cli.json; angular的配置文件，root代表的是根目录，main.ts代表的是启动脚本, polyfills.ts支持某些老的版本的浏览器。
5. angular在appModule主模块中加载所依赖的所有模块，然后在其bootstrap中指定的主组件，对应的css选择器（selector），在所有的加载完成之前，显示标签中的内容，如loading...。加载完所有的依赖的模块后，会在index.html中寻找启动模块指定的主组件对应的选择器。
二。引入第三方类库的步骤：
1. #npm install --save bootstrap
2. #npm install --save @types/bootstrap
3. 在.angular-cli.json中进行配置：
```
"styles": ["../node_modules/bootstrap/dist/css/bootstrap.css"]
,
"scripts":["../node_modules/bootstrap/dist/js/bootstrap.js"]
```
三。属性绑定：
1. html标签的属性和控制器上的属性绑定在一起。
2. 样式绑定： [class.glyphicon-star-empty]='star';
四：