import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/Rx';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  dataSource: Observable<any>;
  products: Array<any> = [];

  constructor(private http: Http) {
    let myHeader: Headers = new Headers();
    myHeader.append('Authorization', 'Basic 123456');
    this.dataSource = this.http.get('/apa/products', { headers: myHeader })
                               .map((res) => res.json());
   }

  ngOnInit() {
    this.dataSource.subscribe((data) => this.products = data);
  }



}
