import { AbstractControl, FormGroup } from '@angular/forms';
// AbstractControlis base class for everything like FormGroup, FormControl, FormArray etc
// so it has all the information which your all form control, form group can have
export class CustomValidator {
  static validateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }
  static validateSpecialCharacter(character: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(character)) {
        return {
          invalidSpecialCharacter: true,
        };
      }
      return null;
    };
  }
  static validateStartToEndDate(control: FormGroup) {
    // const checkInDate = control.get('checkInDate')?.value;
    // const checkOutDate = control.get('checkOutDate')?.value;
    const MILLI_SECOCNDS = 1000;
    const MINUTES = 60;
    const SECONDS = 60;
    const HOURS = 24;
    const checkInDate: any = new Date(control.get('checkInDate')?.value);
    const checkOutDate: any = new Date(control.get('checkOutDate')?.value);
    const differenceInTime = checkOutDate - checkInDate;
    const differenceInDays = Math.ceil(
      differenceInTime / (MILLI_SECOCNDS * MINUTES * SECONDS * HOURS)
    );
    if (differenceInDays <= 0) {
      // setting this form level validation errors to specific control or input field so we can easily display it infront of every input field
      control.get('checkOutDate')?.setErrors({ invalidDate: true });
      return {
        invalidDate: true,
      };
    }
    return null;
  }
}
