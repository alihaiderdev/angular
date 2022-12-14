import { Directive } from '@angular/core';

@Directive({
  selector: '[appRedElement]',
})
export class RedElementDirective {
  // constructor(private element: ElementRef) {
  //   // console.log(this.element.nativeElement);
  // }
  // ngOnInit(): void {
  //   this.element.nativeElement.style.color = 'red';
  // }
}
