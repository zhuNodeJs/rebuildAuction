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
四：routelink必须要用斜杠开头, 后面是参数是数组,路由不存在时，routes中的path配置的'**', 即为统配符。
五：路由时传递数据
1. 在查询参数中传递数据 /product?id=1&name=2 => ActivatedRoute.queryParams[id]
2. 在路由路径中传递数据 {path:'/product/:id'} => /product/1 => ActivatedRoute.params[id]
3. 在路由配置中传递数据 {path:'/product', component: ProductComponent,data: [{isProd: true}]} => ActivatedRoute.data[0][isProd]
4. <a [routerLink]="['/product']" [queryParams]="{id: 1}"></a> => this.productId = this.activatedRoute.snapshot.queryParams['id'];
5. 在url传递参数： 在path中product/:id; 在routerLink中“['/product', 1]”,id为1, 
this.activatedRoute.snapshot.params['id'];
6. this.router.navigate(['/product', 2]); 在商品详情和商品详情之间进行跳转时，由于ngInit已经创建，且只能初始化一次，解决的方式参数订阅，由参数快照改为参数订阅，this.activatedRoute.params.subscribe((params: Params)=> {this.productId = params['id']});参数改变的话，组件也改变。(
    总结： 不在自身跳转的时候可以使用参数快照，在自身的组件进行跳转的时候，使用订阅的实现跳转。
)
7. jumpHandle() {
    this.router.navigate(['product-detail'], {
        queryParams:{
            productId: 1,
            title: 'moon'
        }
    })
} 
在获取的参数：
activatedRoute.queryParams.subscribe(queryParams => {
    let productId = queryParams.productId;
    let title = queryParams.title;
})
8. 重定向路由： 在routes中 {path: '', redirectTo: '/home', pathMath: 'full'}
9. 子路由(子路由使用的是相对的的地址)：{path:'home', component: HomeComponent, 
 children: [
     {path: './', Component: xxxComponent},
     {path: './seller/:id', Component: yyyComponent}
 ]}
 路由信息存在于模块中，组件是不晓得路由信息的。
 10. 辅助路由：
 ```
 <route-outlet></route-outlet>
 <route-outlet name='aux'></route-outlet>

 {path: xxx, component: XxxComponent, outlet：aux}
 {path: yyy, component: YyyComponent, outlet: aux}

 <a [routerLink]=['/home', {outlets: 'xxx'}]></a>
 <a [routeLink]=['/product', {outlets: 'yyy'}]></a>

 上面一个是主路由，下面是辅助路由, 有名字是辅助路由。

 <a [routeLink]='[{outlets: {primary: 'home', aux: "xxx"}}]'>开始聊天</a>
 <a [routeLink]='[{outlets: {aux: null}}]'>结束聊天</a>
 当点击开始聊天时，在跳到开始聊天的页面的同时，也跳到了primary页面， 即主页面。
 ```
 11. 路由守卫：进入时进行守卫：canActivate：创建ts文件导出类。
   {path:'', component: ProductComponent, canActivate: [loginGuard]}
   @NgModule({
       providers:[LoginGuard] // 此处对守卫进行实例化
   })
   离开时进行守卫：CanDeactivate<ProudctComponent>// 需要泛型, 即需要添加要保护的组件名称
   添加的方式和CanActivate守卫一样。
 12. 路由守卫（resolve）: 解决异步请求数据延迟的体验不好的问题，可以在进入之前去请求数据，带着数据进入路由。
 需要新建ProductResolve.ts文件，实现方法，实现接口implement.
 @Injectable() 需要注入器才能加入router.  
 在routes中url中添加
 ```
 resolve: {
     product: ProductResolve
 }

 @NgModule({
     // ...
     providers: [ProductResolve]
 })
 ```
六：路由的配置步骤：
```
const routeConfig: Routes = [
    {path: '', component: HomeComponent},
    {path: 'product/:prodTitle, component: ProductDetailComponent}
]

imports: {
    //...
    RouterModule.forRoot(routeConfig)
}

```
七. 当一个类implements继承另一个类时， 需要实现另一个类的方法。
八. @Injectable(); 的作用是决定其他的服务是否能注入进来(通过constructor);如果想要将一个服务注入到其他的服务，则要将这个服务添加到提供器中(providers).
九. 