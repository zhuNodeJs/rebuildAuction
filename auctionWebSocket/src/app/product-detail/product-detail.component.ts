import { WebsocketService } from './../shared/websocket.service';
import { ProductService, Product, Comment } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public comments: Comment[];

  public newRating: number = 5;
  public newComment: string = '';

  public isCommentHidden: boolean = true;

  // 关注参数
  public isWatched:boolean = false;
  public currentBid: number;

  // 保存这个流
  public subscription: Subscription;

  constructor(private productService: ProductService, private routeInfo: ActivatedRoute, private wsService: WebsocketService) { }

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(data => {
        this.product = data[0];
        this.currentBid = this.product.price;
    })
    this.productService.getCommentForProduct(productId)
                       .subscribe(data => this.comments = data)
  }

  addComment() {
    let comment: Comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);
    // 求星星的平均值
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    // 重置表单
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct() {
    // 服务器返回的流的订阅
    if (this.subscription) {
      //  取消对流的订阅， 并对subscription赋值为null;
     this.subscription.unsubscribe();
     this.isWatched = false;
     this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8090', this.product.id)
      .subscribe(
         products => {
            products = JSON.parse(products);
            console.log(products);
            let product = products.find(p => p.productId == this.product.id);
            this.currentBid = product.bid;
         }
      );
    }
  }
}
