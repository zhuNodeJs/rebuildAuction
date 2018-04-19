import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import { equalModelValidator } from '../validators/validator';

@Directive({
  selector: '[equal]',
  providers: [{provide: NG_VALIDATORS, useValue: equalModelValidator, multi: true}]
})
export class EqualValidatorDirective {

  constructor() { }

}
