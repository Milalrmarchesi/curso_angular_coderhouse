import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigTitleDirective } from './directives/big-title.directive'


@NgModule({
  declarations: [
    BigTitleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
