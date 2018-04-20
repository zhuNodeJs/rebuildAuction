import { ProductService, Product, Comment } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Comment[];

  private newRating: number = 5;
  private newComment: string = '';

  private isCommentHidden: boolean = true;

  constructor(private productService: ProductService, private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(data => {
        this.product = data[0];
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

}
