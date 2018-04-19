import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms-react',
  templateUrl: './forms-react.component.html',
  styleUrls: ['./forms-react.component.css']
})
export class FormsReactComponent implements OnInit {

  private formModel: FormGroup = new FormGroup({
    dataRange: new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    }),
    emails: new FormArray([
      new FormControl('aa@aa.com'),
      new FormControl('bb@bb.com')
    ])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formModel.value);
  }

  addEmail() {
    let emails = this.formModel.get('emails') as FormArray;
    emails.push(new FormControl())
  }
}
