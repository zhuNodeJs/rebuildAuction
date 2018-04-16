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

  constructor(private productService: ProductService, private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params['id'];
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentForProduct(productId);
  }

}
