import { Directive, HostListener, Output, Input, ElementRef } from '@angular/core';

@Directive({
	// tslint:disable-next-line: directive-selector
	selector: '[todoMouseOver]',
	exportAs: 'todoMouseOver'
})
export class MouseOverDirective {
	@Output()
	isMouseOver = false;

	elementRef!: ElementRef;

	@HostListener('mouseenter', ['$event'])
	mouseenter(event: MouseEvent): void {
		this.isMouseOver = true;
	}

	@HostListener('mouseout')
	mouseout(): void {
		this.isMouseOver = false;
	}

	constructor(el: ElementRef) {
		this.elementRef = el;
	}
}
