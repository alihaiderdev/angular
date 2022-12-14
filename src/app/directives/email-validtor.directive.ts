import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidtor]',
  // here we tell angular by passing this {
  //   provide: NG_VALIDATORS,
  //   useExisting: EmailValidtorDirective,
  //   multi: true,
  // }, in providors array that please add this custom validator in your existing validators and we set it multi true because angular has array of validators not object and we set providor in the same way to HTTP intceptor and here useExisting mean whenever i use this validator directive then add this class to all own validators array
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidtorDirective,
      multi: true,
    },
  ],
})

// write custom validators for template driven forms
export class EmailValidtorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // if (control.value) { } if we do in this way then we dont see any typing suggestion so getting typing do tis
    const value = control.value as string;
    if (value.includes('test')) {
      return { invalidEmail: true };
    }
    return null;
  }
}
