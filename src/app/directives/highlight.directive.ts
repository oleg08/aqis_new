import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {}

  @Input('appHighlight') highlightClass: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove(this.highlightClass);
  }

  private highlight(cl: string) {
    this.el.nativeElement.classList.add(cl);
  }
}
