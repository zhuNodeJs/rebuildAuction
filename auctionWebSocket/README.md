#### 主要来实现websocket的实例
注： 由于配置了端口的请求的代理proxy.conf.json，所以启动是必须是使用#npm run start;
##### 实现关注价格的功能
1. 在商品的详情的页面上，添加响应的样式：
```
<div class="thumbnail">
  <button class="btn btn-default btn-lg" [class.active]="isWatched" (click)='watchProduct()'>
    {{isWatched ? '取消关注':'关注'}}
  </button>
  <label>最新出价: {{currentBid}}元</label>
</div>

<!-- 相应的ts文件 -->
// 关注参数
  public isWatched:boolean = false;
  public currentBid: number;  
```
2. 步骤：

客户端 | 服务器端
---|---
点击关注按钮(创建连接) | 将productId放入到一个集合中 
订阅这个流 | 
更新商品价格 | <- 生成新的商品出价,并推送给客户端
取消关注(取消订阅流)-> | 在推送时排除客户端

3. set类似数组，而Map类似于对象，有key值。
Map本质上是键值对的集合(Hash结构), 但在传统上只能使用字符串当做键。
当不能引用Map, Set时， 需要在tsconfig.json中加入：
```
"lib": [
  "es2015"
]
<!-- tsconfig.json完整的配置文件为： -->
{
    "compileOnSave": false,
    "compilerOptions": {
      "outDir": "built/",
      "sourceMap": true,
      "declaration": false,
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "target": "es5",
      "typeRoots": [
        "node_modules/@types"
      ],
      "lib": [
        "es2017",
        "dom"
      ]
    }
  }
  
```
4. 
