import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnInit {
  // directives are similar as component but it will never have template like Component its a helper function for component or any dom element
  // @Input() color: string = 'red';
  // to make variable and directive name same so no need to extra variable for setting color but in this case default value will not work
  @Input() appHover: string = 'red';
  // constructor(private element: ElementRef, private renderer: Renderer2) {
  //   // console.log(this.element.nativeElement);
  //   this.element.nativeElement.style.color = 'white';
  // }
  ngOnInit(): void {
    // this.renderer.setStyle(
    //   this.element.nativeElement,
    //   'backgroundColor',
    //   this.color
    // );
    // this.renderer.setStyle(
    //   this.element.nativeElement,
    //   'backgroundColor',
    //   this.appHover
    // );
  }
  // HostListener are actually used to listen to any event which is happening on your parent Component the compoenent where the particular directivee applied
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.renderer.setStyle(
  //     this.element.nativeElement,
  //     'backgroundColor',
  //     'green'
  //   );
  // }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.renderer.setStyle(
  //     this.element.nativeElement,
  //     'backgroundColor',
  //     'yellow'
  //   );
  // }
}
