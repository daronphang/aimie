import { Directive, Input, AfterViewInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appImage]',
  standalone: true,
})
export class ImageDirective implements AfterViewInit {
  @Input() byteArr: string; // base64
  @HostBinding('attr.src') src: string;
  constructor() {}

  ngAfterViewInit(): void {
    this.src = `data:image/png;base64,${this.byteArr}`;
  }
}
