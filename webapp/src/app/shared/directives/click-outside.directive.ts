import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({ selector: '[fdClickOutside]' })
export class ClickOutsideDirective {
  elementRef = inject(ElementRef);

  onOutsideClick = output();

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    const element = this.elementRef.nativeElement;
    if (!element.contains(clickedElement)) {
      this.onOutsideClick.emit();
    }
  }
}
