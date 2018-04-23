var express = require('express');
var app = express();
var Server = require('ws').Server;
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
var Coment = /** @class */ (function () {
    function Coment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Coment;
}());
var products = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，排列为第一个', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品，排列为第一个', ['食品', '硬件设备']),
    new Product(3, '第三个商品', 3.99, 1.5, '这是第三个商品，排列为第一个', ['硬件设备']),
    new Product(4, '第四个商品', 4.99, 3.5, '这是第四个商品，排列为第一个', ['电子产品', '硬件设备']),
    new Product(5, '第五个商品', 5.99, 4.5, '这是第五个商品，排列为第一个', ['生活', '硬件设备']),
    new Product(6, '第六个商品', 6.99, 3.5, '这是第个商品，排列为第一个', ['图书'])
];
var comments = [
    new Coment(1, 1, '2017-02-02 22:22:22', '张三', 3, '东西不错'),
    new Coment(2, 1, '2017-03-03 23:22:22', '李四', 4, '东西是不错'),
    new Coment(3, 1, '2017-04-04 21:22:22', '王五', 2, '东西挺不错'),
    new Coment(4, 2, '2017-05-05 20:22:22', '赵六', 4, '东西还不错')
];
app.get('/', function (req, res) {
    res.send('Hello, world!');
});
app.get('/apa/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) {
            return p.title.indexOf(params.title) != -1;
        });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) {
            return p.price <= params.price;
        });
    }
    if (params.category && params.category != '-1' && result.length > 0) {
        result = result.filter(function (p) {
            console.log(p.categories);
            console.log(params.category);
            return p.categories.indexOf(params.category) != -1;
        });
    }
    res.json(result);
});
app.get('/apa/product/:id', function (req, res) {
    res.json(products.filter(function (item) {
        return item.id == req.params.id;
    }));
});
app.get('/apa/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) {
        return comment.productId == req.params.id;
    }));
});
var server = app.listen(8889, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
// Map中存在的是：每一个客户端关注的商品的id的数组,因为每一个客户端可以关注多个商品;
var subscriptions = new Map();
var wsServer = new Server({ port: 8090 });
wsServer.on('connection', function (websocket) {
    //   websocket.send('这个消息是服务器主动推送的!');
    websocket.on('message', function (message) {
        var messageObj = JSON.parse(message);
        var productIds = subscriptions.get(websocket) || [];
        // 将新的商品的Id放到值的数组中;
        subscriptions.set(websocket, productIds.concat([messageObj.productId])); // [...productIds]: 扩展运算符  
    });
});
// currentBid是商品Id对应的price的集合;
var currentBids = new Map();
// 实现消息向客户端的定时的推送
setInterval(function () {
    // 随机生成每个商品的最新的商品的价格
    products.forEach(function (product) {
        var currentBid = currentBids.get(product.id) || product.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(product.id, newBid);
    });
    // 循环每一个客户端, 推送每一个客户端关注的商品的价格
    subscriptions.forEach(function (productIds, ws) {
        // 返回的数据的格式是：[{productId:xxx,bid: xxx},{},{}],对应是每个被关注的商品的最新的报价
        if (ws.readyState === 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions.delete(ws); // 删除已经关闭的客户端
        }
        // 这之后，然后在客户端订阅这个流;
    });
}, 2000);
//# sourceMappingURL=websocketServer.js.map