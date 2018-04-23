import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/Rx';

@Injectable()
export class ProductService {
  constructor(private http: Http) { }

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  getProducts(): Observable<Product[]> {
    return this.http.get('/apa/products').map((res) => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/apa/product/'+id).map((res) => res.json());
  }

  getCommentForProduct(id: number):Observable<Comment[]>  {
    return this.http.get('/apa/product/'+id+'/comments').map((res) => res.json());
  }

  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书']
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/apa/products', {search: this.encodeParams(params)}).map((res) => res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    let result: URLSearchParams;
    result = Object.keys(params)
             .filter(key => params[key])
             .reduce((sum:URLSearchParams, key:string) => {
                sum.append(key, params[key]);
                return sum;
             }, new URLSearchParams());
    return result;
  }
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ){

  }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {

  }
}
