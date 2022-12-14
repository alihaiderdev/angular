import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverDirective } from '../directives/hover.directive';
import { RedElementDirective } from '../directives/red-element.directive';
import { EmailValidtorDirective } from './../directives/email-validtor.directive';

@NgModule({
  declarations: [HoverDirective, RedElementDirective, EmailValidtorDirective],
  exports: [HoverDirective, RedElementDirective],
  imports: [CommonModule],
})
export class SharedModule {}
