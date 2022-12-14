import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit, OnChanges {
  // anytime you want property changes from parent component to child component we have 2 approaches getter and setter with input decorator or ngOnChanges lifecycle method
  // using getter and setter with input decorator
  // private _loggedIn!: boolean;
  // message!: string;

  // get loggedIn(): boolean {
  //   return this._loggedIn;
  // }
  // @Input()
  // set loggedIn(value: boolean) {
  //   this._loggedIn = value;
  //   if (value === true) {
  //     this.message = 'Welcome back Vishwas';
  //   } else {
  //     this.message = 'Please log in';
  //   }
  // }

  // using ngOnChanges lifecycle method
  @Input() loggedIn!: boolean;
  message!: string;
  constructor() {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes['loggedIn'].currentValue === true) {
      this.message = 'Welcome back Vishwas';
    } else {
      this.message = 'Please log in';
    }
  }
}
