import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-model',
  templateUrl: './forms-model.component.html',
  styleUrls: ['./forms-model.component.css']
})
export class FormsModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any, valid: boolean) {
    console.log(JSON.stringify(value));
    console.log('form的valid:', valid);
  }

  private mobileValid: boolean = true;

  onMobileInput(form: NgForm) {
    if (form) {
      this.mobileValid = form.form.get('userName').valid;
    }
  }
}
