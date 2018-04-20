import { ProductService, Product } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Array<Product>;
  private keyword: string;

  private titleFilter: FormControl = new FormControl();

  constructor(public productService: ProductService) {
    this.titleFilter.valueChanges
        .debounceTime(500)
        .subscribe((value) => {
          this.keyword = value;
        })
  }

  ngOnInit() {
    // 首次登陆的时候对商品的展示
    this.productService.getProducts()
        .subscribe(data => {
          this.products = data;
        });
    // 通过搜索按钮实现的发射的流的接收和订阅
    this.productService.searchEvent.subscribe(
      params => this.productService.search(params).subscribe(data => this.products = data)
    )
  }

}

