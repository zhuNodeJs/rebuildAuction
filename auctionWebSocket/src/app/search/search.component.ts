import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { positiveValidator } from '../validators/validators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;

  categories: string[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
      this.formModel = fb.group({
        title: ['', Validators.minLength(3)],
        price: [null, positiveValidator],
        category: ['-1']
      })
   }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  onSubmit() {
    const valid: boolean = this.formModel.valid;
    if (valid) {
      console.log(this.formModel.value);
      this.productService.searchEvent.emit(this.formModel.value); // 事件的发射
    }
  }

}
