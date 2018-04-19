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
    this.productService.getProducts()
        .subscribe(data => {
          this.products = data;
        });
  }

}

