var express = require('express');
var app = express();

// 解决跨域
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

function Product(id, title, price, rating, desc, categories) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.desc = desc;
    this.categories = categories;
}

function Comment(id, productId, timestamp, user, rating, content) {
    this.id = id;
    this.productId = productId;
    this.timestamp = timestamp;
    this.user = user;
    this.rating = rating;
    this.content = content;
}

var comments = [
    new Comment(1, 1, '2017-02-02 22:22:22', '张三', 3, '东西不错'),
    new Comment(2, 1, '2017-03-03 23:22:22', '李四', 4, '东西是不错'),
    new Comment(3, 1, '2017-04-04 21:22:22', '王五', 2, '东西挺不错'),
    new Comment(4, 2, '2017-05-05 20:22:22', '赵六', 4, '东西还不错')
  ];

var products = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，排列为第一个', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品，排列为第一个', ['食品', '硬件设备']),
    new Product(3, '第三个商品', 3.99, 1.5, '这是第三个商品，排列为第一个', [ '硬件设备']),
    new Product(4, '第四个商品', 4.99, 3.5, '这是第四个商品，排列为第一个', ['电子产品', '硬件设备']),
    new Product(5, '第五个商品', 5.99, 4.5, '这是第五个商品，排列为第一个', ['生活', '硬件设备']),
    new Product(6, '第六个商品', 6.99, 3.5, '这是第个商品，排列为第一个', [ '图书'])
    ];

app.get('/', function(req, res) {
    res.send('Hello, world!');
})    

app.get('/apa/products',function(req, res) {
    var result = products;
    var params = req.query;    
    console.log(params);
    if (params.title) {
        result = result.filter(function(p) {
            return p.title.indexOf(params.title) != -1;
        })
    }    

    if (params.price && result.length > 0) {
        result = result.filter(function(p) {
            return p.price <= params.price;
        })
    }
    
    if (params.category && params.category != '-1' && result.length > 0) {        
        result = result.filter(function(p) {
            console.log(p.categories);
            console.log(params.category);
            return p.categories.indexOf(params.category) != -1;
        }) 
    }    

    res.json(result);
})

app.get('/apa/product/:id', function(req, res) {
    res.json(products.filter(function(item) {
        return item.id == req.params.id;
    }))
})

app.get('/apa/product/:id/comments', function(req, res) {
    res.json(comments.filter(function(comment) {
        return comment.productId == req.params.id;
    }))
})


var server = app.listen(8888,'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})



