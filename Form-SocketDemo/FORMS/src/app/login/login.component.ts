import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { mobileValidator, equalValidator, mobileAsyncValidator } from '../validators/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formModel: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.formModel = new FormGroup({
    //   userName: new FormControl(),
    //   phoneNumber: new FormControl(),
    //   passwordArray: new FormGroup({
    //     pwd: new FormControl(),
    //     pwdAgain: new FormControl()
    //   })
    // });

    // fb来书写响应式表单
    this.formModel = fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', mobileValidator, mobileAsyncValidator],
      passwordArray: fb.group({
        pwd: ['', Validators.minLength(6)],
        pwdAgain: ['']
      }, {validator: equalValidator})
    });
    // 校验
   }

  ngOnInit() {
  }

  onSubmit() {
    let isValid: boolean = this.formModel.get('userName').valid; // 可以得到valid(有效性), errors(错误信息)
    console.log(isValid);
    // console.log(this.formModel.value);
    // console.log(this.formModel.valid);
    console.log(this.formModel.get('userName').errors);
  }
}
