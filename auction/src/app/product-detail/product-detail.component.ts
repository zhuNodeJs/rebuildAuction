import { WebsocketService } from './../shared/websocket.service';
import { ProductService, Product, Comment } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  // public isWatched:boolean = false;
  // public currentBid: number;

  constructor(private productService: ProductService, private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(data => {
        this.product = data[0];
        // this.currentBid = this.product.price;
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

  // watchProduct() {
  //   this.isWatched = !this.isWatched;

  //   this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
  //       .subscribe();
  // }

}
