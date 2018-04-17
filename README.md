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
九. 数据绑定(是单向的)
<input (input)='onInputEvent($event)'> $event是一个浏览器事件对象，右侧也可以是一个表达式。可以是一个标准的dom事件，也可以是自定义的事件。
插值表达式和属性绑定是相同的。angular会把插值表达式解释成为属性绑定。

html属性和DOM属性的区别？

input中的event.target.value是dom属性，html属性是保持不变的(event.target.getAttribute('value'))，其在dom节点创建时初始化。
html初始化dom属性，然后它的任务就完成了。dom的值可以改变，html的值不能改变。
button的disable属性。当这个属性出现的时候，由于html初始化他的值初始化为true，所以只要这个属性一出现，则button即被禁用。即使disabled='false'，按钮也是不可使用的， 即无法通过设置html属性的值来禁用按钮，但是可以通过设置dom属性的值，来控制按钮是否可用, [disable]='false'，按钮可用。
1. 少量的HTML属性和DOM属性之间有着1:1的映射,例如：id.
2. 有些HTML属性没有对应的DOM属性，如colspan.
3. 有些dom属性没有对应的HTML属性，如：textContent.
4. 就算名字相同，但HTML属性和DOM属性也不是一样东西。
5. HTML属性的值指定了初始值，DOM属性表示当前值，DOM属性的值可以改变，但是HTML属性的值不能改变。
6. angular的模板绑定是通过DOM属性和事件来工作的，而不是HTML属性,插值表达式是DOM属性绑定。

HTML属性绑定
1. 基本的Html属性绑定 <td [attr.colspan]='tableColspan'>Something</td>
2. css类绑定 <div class='aaa bb' [class]='someExpression'>something</div>,
<div [class.isSpecial]='isSpecial'>Something</div>,
<div [ngClass]='{aaa: isA, bbb: isB}'></div>
3. 样式绑定 <button [style.color]='isSpecial ?  "red": "green"'></button>,
<div [style.font-size.em]='isDev'? 1 : 3></div> 单一样式的好方法,
<div [ngStyle]='{"font-style": this.canSave ? "italic": "normal"}'></div>
十：管道
{{birthday | date | uppercase | lowercase}}
date: 'yyyy-MM-dd HH:mm:ss' 格式化时间参数
{{pi | number: '2.2-2'}} // 点后面的数字是代表小数点后的最小的位数，最大的位数
{{data | async}} 服务器通信时使用，处理异步流

自定义管道：#ng g pipe pipe/multipe
```
export class MultiplePipe implements PipeTransform {
    transform(value: number,arg?: number): any { // value代表的是输入的值
        if (!args) {
            args = 1;
        }
        return value * arg;
    }
}
```

十一：响应式编程(需要在主模块中引入ReactiveFormsModule)
步骤：
1. <input class='form-control' placeholder='请输入商品名称' [formControl]='titleFilter'> // 将formControl属性和titleFilter联系起来, 然后在input的value变化时触发valueChanges的数据流，然后在construtor构造函数中订阅这个数据流即可。
2. private titleFilter: FormControl = new FormControl(); 
3. 
private keyword: string;
constructor() {
    this.titleFilter.valueChanges
        .debounceTime(500)
        .subscribe((value) => {
            this.keyword = value;
        })
}

4. import 'rxjs/Rx';

5. 
```
<div class='col-md-4 col-sm-4 col-lg-4' *ngFor="let item of products | filter:'title':keyword"></div>
当keyword实时的改变时，products的结果也就是根据keyword, title也是实时的改变。
``` 
十二： 组件的通讯(松耦合低内聚)
子组件发送事件：（EventEmitter的参数需要泛型，是发送的数据类型）
1. private lastPrice:EventEmitter<PriceQuote> = new EventEmitter();
this.lastPrice.emit(priceQuote);
2. 父组件接受：
<app-price-quote (lastPrice)='priceQuoteHandle($event)'></app-price-quote>
3. @Output('发射的事件的名字'),在父组件中()中引用。
十三：中间人模式
中间人模式就是寻找子组件们共同的父组件，最顶级的中间人是根组件，即AppComponent.
十四: ngOnChanges钩子
```
ngOnChanges(changes: SimpleChanges): void {
  let name = changes['name'].currentValue;
}
```
constructor和ngOnInit的区别：
1. 当本组件中存在输入属性时，输入属性的值的初始化是在ngOnChanges中完成，所以在constructor中的输出得到的值是
空值，因此可以在ngOnInit中进行输入属性的值的取值的操作而不应该在constructor中对值进行操作。
十五： ngOnChanges
不可变对象：内存地址在被创建之后不再改变，值类型对象，创建的每一个对象都是不可变的，例如：var greeting = 'hello'; greeting = 'world'; 这是创建了两个对象.
可变对象：var user = {name: 'Tom'};user.name = 'Jerry';改动的对象的内容，内存地址没有变。
注意：
 1. 当父组件的传入的对象是可变对象，所以当父组件的传递的对象的属性发生变化时，并不能触发子组件的ngOnChange钩子，
 但是由于angular有动态监测机制，所以当父组件的对象的属性发生变化，子组件的仍然可以显示在页面上。
 2. 对于不可变对象：值类型的数据，当对变量进行进行重新赋值时，改变的值变量的内存对象，即变量的内存的地址也跟着改变。
      对于可变对象：对象类型的数据，当改变变量属性的内容时，变量的内存地址没有发生改变，只是内容发生改变。
 3. 只有是输入属性的变化时，才会触发ngOnChanges钩子。变更检测机制还是会检测每一个对象的属性的值的变化。

十六：变更检测机制
所有的**异步的操作**都会触发变更检测机制，分为default和OnPush两种。是由zone.js控制的。当某个组件的变更检测策略为OnPush，则只有它的输入属性发生变化时，才会触发这个组件和这个组件的子组件的变更检测策略。default策略的检查都是从根组件开始。变更检测机制的实现是由ngDoCheck来实现的。

十七：父组件中调用子组件中的代码
1. 方法一：
```
// 子组件中的方法
greeting(name: string) {
    console.log('hello'+name);
  }

  <!-- 父组件的获取子组件的方法 -->
  <app-footer #child1></app-footer>

  // 调用子组件的方法
  @ViewChild('child1')
  child1: FooterComponent;

  ngOnInit() {
    this.child1.greeting('tom');
  }
```
2. 方法二：
```
// 子组件中的方法
greeting(name: string) {
    console.log('hello'+name);
  }

 <app-footer #child2></app-footer>
<button (click)='child2.greeting("Jerry")'>点击调取子组件的方法</button> 
```
十八：变更检测周期，在视图的view组合之中不可改变组件的属性的操作，如果要使用的话，可以使用setTimeout();中即可。

十九:  ngAfterViewInit和ngAfterViewChecked (视图内容和视图变更检测)
- 初始化的方法会在变更检测方法前面被调用，都是在视图组件组装完毕之后被调用。
- 不要在这两个方法中试图去改变视图中绑定的东西，如果想要改变也要写在一个setTimeout里边，让其在Javascript中的另一个运行周期中去运行。
- 初始化的方法都只是调用一次
- 如果有子组件，会先组装完子组件然后在组装父组件
- 如果想实现ngAfterViewChecked这个钩子，方法一定要非常高效，非常的轻量级，不然会引发性能的问题
- 在这两个接口中，改变的属性一定要在模板上显示才会爆出错误，如果爆出错误，建议使用setTimeout解决，另外，不建议在这两个是实现接口的函数中改变模板的值。
- 数据改变和视图检测是在一起的。

二十：投影：即将父组件的任意一个片段投影到子组件上。
  1. 使用<ng-content></ng-content>标记一个投影点      
  2. 父组件中的设置：将要投影到子组件的html片段放置在selector上，即例如：<app-child>
  <div>这个div师傅组件投影到子组件中</div>
  </app-child>
  3. 如果在一个模板上有多个投影点，则可以使用class类名进行区分，在父组件中，设置要投影的片段的类，然后在子组件中，在放置投影的片段的<ng-content>上添加select='.类名';例：
  <ng-content selector='.header'></ng-content>, 传递的内容是解析过的，可以在传递的内容中添加**差值表达式**，插值表达式只能使用父组件的属性，而不能使用子组件中的属性。
  4. 在<div [innerHTML]='divContent'></div>, ts中divContent = '<div>插入</div>';
  也可以将html片段插入到字段中。存在浏览器依赖。

二十一：ngAfterContentInit ngAfterContentChecked (可以改变属性内容，而不会报错, 可以在钩子中添加改变属性的方法)

  是被投影的内容组装完成后，进行调用的。父组件向子组件进行的投影的初始化和变更检测。先投影(父 -> 子), 在视图内容组装( 子 -> 父).
  
  ngOnInit: 初始化除输入属性的初始化。
  ngOnDestroy: 路由跳转的时候，前一个路由会被销毁。

二十二：
```  
  <app-stars [(rating)]='newRating' [readonly]='false'></app-stars>
  <!-- 解析 -->
  [(rating)]='newRating'; 
  将rating 和 newRating两个变量联系起来，实现两者的互相的调动。其中一个值的变化会导致另一个值的变化；
  从父组件到子组件的数据的传递采用的是属性的绑定，而由子组件到父组件的采用的是事件的发射(EventEmitter其中需要一个泛型), 其中的事件的发射的写法：
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();
  其中的ratingChange是一个固定的写法，只有这样写，才能在app-stars上的实现[(rating)]的绑定，将属性值的传入和事件的接收的放在一起。其中的readonly属性是作为一个属性的传入属性存在的。是接收父组件的值。
  其中星星的实现：
  <p>
    <span *ngFor="let star of stars; let i = index;" class="glyphicon glyphicon-star"  [class.glyphicon-star-empty]='star' (click)='clickStar(i)'>
    </span>
    <span>{{rating}}星</span>
  </p>
```
注意：由于星星的个数采用的输入的值，所有星星的绘制操作，要放在ngOnChanges钩子中来实现，当星星的个数发生变化时，会触发变更的检测。
```
// 当输入属性发生变化，则触发ngOnChanges函数;
  ngOnChanges(changes: SimpleChanges): void {
      this.stars = [];
      for( var i = 1; i <= 5; i++) {
        this.stars.push(i > this.rating);
      }
  }
```
二十三： 
```
  // 求星星的平均值
  let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);    
``` 
  解析：求和，0表示的是sum的初始值。
二十四：
  





