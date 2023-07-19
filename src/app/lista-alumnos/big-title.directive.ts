import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'h1[bigTitle]'
})

export class BigTitleDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
    }
}